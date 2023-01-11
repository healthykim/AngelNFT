// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./AngelToken.sol";

/// @title Donating & managing donation info contract
/// @author AngelKim
/// @notice Use this contract for donating/managing donation info.
contract Donate is Ownable {
    AngelToken public angelToken;


    struct DonateInfo {
        uint40 destinationId;
        uint56 timeStamp;
        address donator;
        uint256 amount;
    }

    struct DestinationInfo {
        address walletAddress;
        string name;
    }

    /** 
     * Usage
     * - DonateContract.methods.destinations(`destinationId`).call()
     */
    DestinationInfo[] public destinations;
    mapping(address => uint) public numOfDonate;

    /** 
     * Usage
     * - DonateContract.methods.donateInfoList(`donateId`).call()
     */
    DonateInfo[] public donateInfoList;

    event DONATE(address from, address to, uint amount);

    constructor(address angelTokenAddress) {
        angelToken = AngelToken(angelTokenAddress);
    }

    /**
     * @dev Add destination to destination list.
     * 
     * Usage
     * - DonateContract.methods.addDestination(`_destination`, `name`).send()
     *
     * Requirements
     * - `caller` should be owner(deployer) of `Donate` contract.
     */
    function addDestination(address _destination, string memory name) public onlyOwner {
        destinations.push(DestinationInfo(_destination, name));
    }

    /**
     * @dev Donate money to `destinationId` and return NFT tokenId.
     * 
     * Usage
     * - DonateContract.methods.donate(`destinationId`, `isMint`).send({ from: `account` })
     *
     * Requirements
     * - `destinationId` must exist in destinations.
     * - Return value should be ignored in the case of `isMint` == false.
     */
    function donate(uint destinationId, bool isMint) public payable returns(uint16 tokenId) {
        require(destinations.length > destinationId, "Invalid destination Id");
        payable(destinations[destinationId].walletAddress).transfer(msg.value);

        donateInfoList.push(DonateInfo(uint40(destinationId), uint32(block.timestamp), msg.sender, msg.value));
        numOfDonate[msg.sender]++;
        
        tokenId = isMint ? angelToken.mint(msg.sender) : 0;
        emit DONATE(msg.sender, destinations[destinationId].walletAddress, msg.value);
        return tokenId;
    }

    /**
     * @dev Return donate history by `donator`.
     * 
     * Usage
     * - DonateContract.methods.getDonateHistory(`donator`).call()
     */
    function getDonateHistory(address donator) external view returns(DonateInfo[] memory) {
        DonateInfo[] memory info = new DonateInfo[](numOfDonate[donator]);
        
        uint counter = 0;
        for(uint i=0; i<donateInfoList.length; i++) {
            if(donateInfoList[i].donator == donator) {
                info[counter].donator = donateInfoList[i].donator;
                info[counter].timeStamp = donateInfoList[i].timeStamp;
                info[counter].amount = donateInfoList[i].amount;
                info[counter].destinationId = donateInfoList[i].destinationId;
                counter++;
            }
        }

        return info;
    }

    /**
     * @dev Return `destinations` array.
     * 
     * Usage
     * - DonateContract.methods.getDestinations().call()
     */
    function getDestinations() external view returns(DestinationInfo[] memory) {
        return destinations;
    }
}
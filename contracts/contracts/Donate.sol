// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./AngelToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Donating & managing donation info contract
/// @author AngelKim
/// @notice Use this contract for donating/managing donation info.
contract Donate is Ownable {
    AngelToken public angelToken;
    DestinationInfo[] public destinations;
    mapping(address => uint) public numOfDonate;

    struct DonateInfo {
        address donator;
        uint32 timeStamp;
        uint256 amount;
        uint16 destinationId;
    }

    struct DestinationInfo {
        address walletAddress;
        string name;
    }

    constructor(address angelTokenAddress) {
        angelToken = AngelToken(angelTokenAddress);
    }

    DonateInfo[] public donateInfoList;

    event DONATE(address from, address to, uint amount);

    function addDestination(address _destination, string memory name) public onlyOwner {
        destinations.push(DestinationInfo(_destination, name));
    }

    function donate(uint destinationId) public payable returns(uint16 tokenId) {
        require(destinations.length > destinationId, "Invalid destination Id");
        payable(destinations[destinationId].walletAddress).transfer(msg.value);

        donateInfoList.push(DonateInfo(msg.sender, uint32(block.timestamp), msg.value, uint16(destinationId)));
        numOfDonate[msg.sender]++;

        tokenId = angelToken.mint(msg.sender);
        emit DONATE(msg.sender, destinations[destinationId].walletAddress, msg.value);
        return tokenId;
    }

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
}
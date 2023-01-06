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
}
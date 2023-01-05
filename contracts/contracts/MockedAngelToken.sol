// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./AngelToken.sol";

/// @title Mocked AngelToken Contract for testing.
/// @author AngelKim
/// @notice DO NOT use this contract in frontend! Use this only for testing.
contract MockedAngelToken is AngelToken {
    function mockTotalTokens(uint16 mockedTokenAmount) public onlyOwner {
        totalTokens = mockedTokenAmount;
    }
}
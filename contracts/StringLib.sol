// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// @name String Lib
// @dev String utilities library
library StringLib {

    // @name Equals
    // @dev Checks if two strings are equal
    function equals(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
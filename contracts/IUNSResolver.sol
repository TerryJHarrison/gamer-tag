// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IUNSResolver {
    function reverseOf(address account) external view returns (uint256);
    function register(uint256 tokenId) external;
    function remove() external;
}

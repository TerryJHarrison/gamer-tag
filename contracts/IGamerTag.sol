// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// @name Gamer Tag Interface
interface IGamerTag {
  // Nicknames
  function getNickname(address _address) external view returns(string memory);
  function setNickname(string memory _nickname) external;

  // Gamer Tags
  function getTag(address _address) external view returns(string memory);
  function claimTag(string memory _tag) external;
  function isTagAvailable(string memory _tag) external view returns(bool);
  function tagClaimedAt(address _address) external view returns(uint256);
}

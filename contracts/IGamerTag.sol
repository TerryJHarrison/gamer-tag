// SPDX-License-Identifier: GPL
pragma solidity ^0.8.11;

// @name Gamer Tag Interface
// @notice Lightweight interface for interacting with the deployed GamerTag contract
// @dev See GamerTag.sol for implementation
interface IGamerTag {
  // --- Nicknames ---
  // @name Get Nickname
  // @notice Gets an addresses nickname, will return an empty string if none is set
  // @param _address address to lookup nickname for
  // @return Addresses nickname
  function getNickname(address _address) external view returns(string memory);

  // @name Set Nickname
  // @notice Sets an addresses nickname, can be changed as often as desired
  // @param _nickname nickname to set for caller
  function setNickname(string memory _nickname) external;

  // --- Gamer Tags ---
  // @name Get Tag
  // @notice Gets an addresses set tag, will return an empty string if none is set
  // @param _address address to tag nickname for
  // @return Addresses gamer tag
  function getTag(address _address) external view returns(string memory);

  // @name Claim Tag
  // @notice Will permanently claim an available tag for the calling address, only callable once per address
  // @dev Will throw an error if the tag has already been claimed
  // @param _tag gamer tag to set for caller
  function claimTag(string memory _tag) external;

  // @name Is Tag Available?
  // @notice Checks if a tag has already been claimed
  // @param _tag gamer tag to set for caller
  // @return Whether the tag is available to claim
  function isTagAvailable(string memory _tag) external view returns(bool);

  // @name Tag Claimed At
  // @notice Returns the epoch time that this address claimed their tag at
  // @param _address address to tag nickname for
  // @return The epoch time that the address was claimed at
  function tagClaimedAt(address _address) external view returns(uint256);
}

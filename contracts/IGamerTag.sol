// SPDX-License-Identifier: GPL
pragma solidity ^0.8.11;

// @title Gamer Tag Interface
// @notice Lightweight interface for interacting with the deployed GamerTag contract
// @dev See GamerTag.sol for implementation
interface IGamerTag {
  // --- Events ---
  // @name Tag Claim
  // @notice Fired when a tag is claimed
  // @param from The address that has claimed their tag
  // @param tag The tag claimed by the player
  // @param claimTime The epoch time at which the tag was claimed
  event TagClaim(address indexed from, string tag, uint256 claimTime);

  // @name Nickname Change
  // @notice Fired whenever a nickname is updated
  // @param from The address that has updated their nickname
  // @param nickname The player's new nickname
  event NicknameChange(address indexed from, string nickname);

  // --- Nicknames ---
  // @name Get Nickname
  // @notice Gets an addresses nickname, will return an empty string if none is set
  // @param _address The address to lookup nickname for
  // @return Addresses nickname
  function getNickname(address _address) external view returns(string memory);

  // @name Set Nickname
  // @notice Sets an addresses nickname, can be changed as often as desired
  // @param _nickname The nickname to set for the calling player
  function setNickname(string memory _nickname) external;

  // --- Gamer Tags ---
  // @name Get Tag
  // @notice Gets an addresses set tag, will return an empty string if none is set
  // @param _address The address to retrieve the tag for
  // @return Addresses gamer tag
  function getTag(address _address) external view returns(string memory);

  // @name Claim Tag
  // @notice Will permanently claim an available tag for the calling address, only callable once per address
  // @dev Will throw an error if the tag has already been claimed
  // @param _tag gamer tag to set for the calling player
  function claimTag(string memory _tag) external;

  // @name Is Tag Available?
  // @notice Checks if a tag has already been claimed
  // @param _tag gamer tag to set for the calling player
  // @return Whether the tag is available to claim
  function isTagAvailable(string memory _tag) external view returns(bool);

  // @name Tag Claimed At
  // @notice Returns the epoch time that this address claimed their tag at
  // @param _address address to tag nickname for
  // @return The epoch time that the address was claimed at
  function tagClaimedAt(address _address) external view returns(uint256);

  // @name Lookup Tag
  // @notice Gets a tag's address, will return an empty string if address has not claimed
  // @param _tag tag to lookup address for
  // @return Tag's address
  function tagLookup(string memory _tag) external view returns(address);

  // --- Decentralization Support ---
  // @name On ERC721 Received
  // @notice Support receiving ERC721 tokens, there is no way to retrieve anything sent to the contract.
  // @dev This is to support owning permanent domain names minted as NFTs
  function onERC721Received(address, address, uint256, bytes calldata) external view returns (bytes4);
}

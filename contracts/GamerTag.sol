// SPDX-License-Identifier: GPL
pragma solidity ^0.8.11;

import "./IGamerTag.sol";

// @name Gamer Tag
contract GamerTag is IGamerTag {
  mapping(address => string) private tags;          // Gamer addresses -> tags (unique)
  mapping(string => address) public tagLookup;      // Gamer tags -> addresses
  mapping(address => string) private nicknames;     // Gamer addresses -> nicknames (not unique)
  mapping(string => address) private claimedTags;   // Tags -> gamer address with it set
  mapping(address => uint256) public tagClaimedAt;  // Gamer addresses -> tag claim time

  // @name Get Nickname
  // @notice Gets an addresses nickname, will return an empty string if none is set
  // @param _address The address to lookup nickname for
  // @return Addresses nickname
  function getNickname(address _address) external view returns(string memory) {
    return nicknames[_address];
  }

  // @name Set Nickname
  // @notice Sets an addresses nickname, can be changed as often as desired
  // @param _nickname The new nickname to set for the calling player
  function setNickname(string memory _nickname) external {
    nicknames[msg.sender] = _nickname;
    emit NicknameChange(msg.sender, _nickname);
  }

  // @name Is Tag Available?
  // @notice Checks if a tag has already been claimed
  // @param _tag The gamer tag to set for the calling player
  // @return Whether the tag is available to claim
  function isTagAvailable(string memory _tag) external view returns(bool){
    return claimedTags[_tag] == address(0);
  }

  // @name Get Tag
  // @notice Gets an addresses set tag, will return an empty string if none is set
  // @param _address address to tag nickname for
  // @return Addresses gamer tag
  function getTag(address _address) external view returns(string memory) {
    return tags[_address];
  }

  // @name Claim Tag
  // @notice Will permanently claim an available tag for the calling address, only callable once per address
  // @dev Will throw an error if the tag has already been claimed
  // @param _tag The gamer tag to set for the calling player
  function claimTag(string memory _tag) external {
    require(claimedTags[_tag] == address(0), "GT: tag already claimed");
    require(tagClaimedAt[msg.sender] == 0, "GT: address has tag");

    // Set tag
    tags[msg.sender] = _tag;
    tagLookup[_tag] = msg.sender;
    claimedTags[_tag] = msg.sender;
    tagClaimedAt[msg.sender] = block.timestamp;
    emit TagClaim(msg.sender, _tag, block.timestamp);
  }

  // @name On ERC721 Received
  // @notice Support receiving ERC721 tokens, there is no way to retrieve anything sent to the contract.
  // @dev This is to support owning permanent domain names minted as NFTs
  function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4) {
    return this.onERC721Received.selector;
  }
}

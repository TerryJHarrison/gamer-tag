// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./IUNSResolver.sol";
import "./IUNSRegistryReader.sol";
import "./StringLib.sol";

// @name Gamer Tag
contract GamerTag {
  mapping(address => string) private tags;          // Gamer addresses -> tags (unique)
  mapping(address => string) private nicknames;     // Gamer addresses -> nicknames (not unique)
  mapping(address => uint256) public tagClaimedAt;  // Gamer addresses -> tag claim time
  mapping(string => address) claimedTags;           // Tags -> gamer address with it set

  //Unstoppable Domains support
  IUNSResolver private unsResolver;
  IUNSRegistryReader private unsRegistryReader;

  constructor(address _unsResolver, address _unsRegistryReader) {
    unsResolver = IUNSResolver(_unsResolver);
    unsRegistryReader = IUNSRegistryReader(_unsRegistryReader);
  }

  // @name Get Nickname
  // @param _address address to lookup nickname for
  function getNickname(address _address) external view returns(string memory) {
    return nicknames[_address];
  }

  // @name Set Nickname
  // @param _nickname nickname to set for caller
  function setNickname(string memory _nickname) public {
    nicknames[msg.sender] = _nickname;
  }

  // @name Get Tag
  // @param _address address to tag nickname for
  function getTag(address _address) external view returns(string memory) {
    return tags[_address];
  }

  // @name Set Tag
  // @dev Will throw an error if the tag has already been claimed
  // @param _tag gamer tag to set for caller
  function setTag(string memory _tag) external {
    require(claimedTags[_tag] == address(0) || claimedTags[_tag] == msg.sender, "GameTag: that tag has already been claimed");

    if(StringLib.equals(tags[msg.sender], "")){
      claimedTags[tags[msg.sender]] = address(0); // Already have a claimed tag, remove it first
    }

    // Update tag claim
    tags[msg.sender] = _tag;
    claimedTags[_tag] = msg.sender;
    tagClaimedAt[msg.sender] = block.timestamp;
  }

  // @name Claim Tag
  function _claimTag(string memory _tag) internal {
    if(StringLib.equals(tags[msg.sender], "")){
      claimedTags[tags[msg.sender]] = address(0); // Already have a claimed tag, remove it first
    }

    // Update tag claim
    tags[msg.sender] = _tag;
    claimedTags[_tag] = msg.sender;
    tagClaimedAt[msg.sender] = block.timestamp;
  }

  // @name Use Unstoppable Domain for Tag
  function useUnstoppableDomainForTag() public {
    uint256 tokenId = unsResolver.reverseOf(msg.sender);
    _claimTag(unsRegistryReader.tokenURI(tokenId));
  }

  // @name Use Unstoppable Domain for Nickname
  function useUnstoppableDomainForNickname() public {
    uint256 tokenId = unsResolver.reverseOf(msg.sender);
    setNickname(unsRegistryReader.tokenURI(tokenId));
  }
}

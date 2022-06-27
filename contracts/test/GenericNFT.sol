// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract GenericNFT is ERC721PresetMinterPauserAutoId {

    constructor() ERC721PresetMinterPauserAutoId("GenericNFT", "gNFT", "https://test.com/metadata/") {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(super.tokenURI(tokenId),".json"));
    }
}
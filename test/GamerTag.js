const GamerTag = artifacts.require("GamerTag");
const {expectRevert, expectEvent} = require('@openzeppelin/test-helpers');

const GenericNFT = artifacts.require('GenericNFT');

contract("GamerTag", (accounts) => {
  let [tj, justin] = accounts;

  let gamerTag;
  let genericNft;
  before(async () => {
    gamerTag = await GamerTag.new();
    genericNft = await GenericNFT.new();
  });

  it("allows claiming a tag", async () => {
    const receipt = await gamerTag.claimTag("NugsyNash", {from: tj});
    expectEvent(receipt, 'TagClaim', {
      from: tj,
      tag: "NugsyNash"
    });

    assert.equal(await gamerTag.getTag(tj), "NugsyNash");
  });

  it("allows searching by tag", async () => {
    assert.equal(await gamerTag.tagLookup("NugsyNash"), tj);
    assert.equal(await gamerTag.tagLookup("TagNotClaimed"), 0x0);
  });

  it("allows setting a nickname", async () => {
    const receipt = await gamerTag.setNickname("Nugsy");
    expectEvent(receipt, 'NicknameChange', {
      from: tj,
      nickname: "Nugsy"
    });

    assert.equal(await gamerTag.getNickname(tj), "Nugsy");
  });

  it("allows updating a nickname", async () => {
    const receipt = await gamerTag.setNickname("Nugsy Nash");
    expectEvent(receipt, 'NicknameChange', {
      from: tj,
      nickname: "Nugsy Nash"
    });

    assert.equal(await gamerTag.getNickname(tj), "Nugsy Nash");
  });

  it("allows clearing a nickname", async () => {
    const receipt = await gamerTag.setNickname("");
    expectEvent(receipt, 'NicknameChange', {
      from: tj,
      nickname: ""
    });

    assert.equal(await gamerTag.getNickname(tj), "");
  });

  it("prevents claiming a duplicate gamer tag", async () => {
    await expectRevert(gamerTag.claimTag("NugsyNash", {from: justin}), "GT: tag already claimed");
  });

  it("prevents user from changing tag", async () => {
    await expectRevert(gamerTag.claimTag("Unchanging", {from: tj}), "GT: address has tag");
  });

  it("can receive ERC721 tokens", async () => {
    await genericNft.mint(tj);
    await genericNft.safeTransferFrom(tj, gamerTag.address, 0, {from: tj})

    assert.equal(await genericNft.ownerOf(0), gamerTag.address);
  })
})
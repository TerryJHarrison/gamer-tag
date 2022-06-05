const GamerTag = artifacts.require("GamerTag");
const {expectRevert} = require('@openzeppelin/test-helpers');

contract("GamerTag", (accounts) => {
  let [tj, justin] = accounts;

  let gamerTag;
  before(async () => {
    gamerTag = await GamerTag.new();
  });

  it("allows claiming a tag", async () => {
    await gamerTag.claimTag("NugsyNash", {from: tj});
    assert.equal(await gamerTag.getTag(tj), "NugsyNash");
  });

  it("allows setting a nickname", async () => {
    await gamerTag.setNickname("Nugsy");
    assert.equal(await gamerTag.getNickname(tj), "Nugsy");
  });

  it("allows updating a nickname", async () => {
    await gamerTag.setNickname("Nugsy Nash");
    assert.equal(await gamerTag.getNickname(tj), "Nugsy Nash");
  });

  it("allows clearing a nickname", async () => {
    await gamerTag.setNickname("");
    assert.equal(await gamerTag.getNickname(tj), "");
  });

  it("prevents claiming a duplicate gamer tag", async () => {
    await expectRevert(gamerTag.claimTag("NugsyNash", {from: justin}), "GamerTag: that tag has already been claimed");
  });

  it("prevents user from changing tag", async () => {
    await expectRevert(gamerTag.claimTag("Unchanging", {from: tj}), "GamerTag: address can only have one tag");
  });
})
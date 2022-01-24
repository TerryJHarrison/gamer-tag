const GamerTag = artifacts.require("GamerTag");
const {expectRevert} = require('@openzeppelin/test-helpers');

contract("GamerTag", (accounts) => {
  let [tj, avery, justin, brett, bryan, pease, unsResolver, unsRegistryReader] = accounts;
  const userNames = {
    [tj]: "NugsyNash",
    [avery]: "AveryBro",
    [justin]: "BugsyTrash",
    [brett]: "Brettzilla",
    [bryan]: "BPN03",
    [pease]: "PeasusChrist"
  };

  let gamerTag;
  before(async () => {
    gamerTag = await GamerTag.new(unsResolver, unsRegistryReader);
  });

  it("allows setting a new tag", async () => {
    await gamerTag.setTag(userNames[tj], {from: tj});
    assert.equal(await gamerTag.getTag(tj), "NugsyNash");
  });

  it("allows setting a nickname", async () => {
    await gamerTag.setNickname("Nugsy");
    assert.equal(await gamerTag.getNickname(tj), "Nugsy");
  });

  it("prevents setting a duplicate gamer tag", async () => {
    await expectRevert(gamerTag.setTag(userNames[tj], {from: justin}), "GameTag: that tag has already been claimed");
  });
})
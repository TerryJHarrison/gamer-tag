const GamerTag = artifacts.require("GamerTag");

module.exports = function(deployer) {
  deployer.deploy(GamerTag,
    "0x332A8191905fA8E6eeA7350B5799F225B8ed30a9", // UNS Resolver (Mumbai)
    "0x332A8191905fA8E6eeA7350B5799F225B8ed30a9"  // UNS registry Reader (Mumbai)
  );
};

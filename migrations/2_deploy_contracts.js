const Starter = artifacts.require("Starter");
const Verification = artifacts.require("Verification");

module.exports = function(deployer) {
  deployer.deploy(Starter);
  deployer.deploy(Verification);
};

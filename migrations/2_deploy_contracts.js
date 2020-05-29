const Starter = artifacts.require("Starter");
const Verification = artifacts.require("Verification");
const MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  deployer.deploy(Starter);
  deployer.deploy(Verification);
  deployer.deploy(MyContract);
};

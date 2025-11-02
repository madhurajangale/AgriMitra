const FarmerMarket = artifacts.require("FarmerMarket");

module.exports = function (deployer) {
  deployer.deploy(FarmerMarket);
};

// truffle console --network development


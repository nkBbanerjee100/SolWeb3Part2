const { network } = require("hardhat");
const { developementChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config");
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    if (developementChains.includes(network.name)) {
        log("local network Deploying mocks.....");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mock deployed!!!!!!!!"
        );
        log("-------------------------------------");
    }
}
module.exports.tags = ["all", "mocks"];
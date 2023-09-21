// function deployFunc() {
//     console.log("testing...");
// }
// module.exports.default = deployFunc

const { network } = require("hardhat");
const { networkConfig, developementChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// const { getNamedAccounts, deployments } = hre  shortcart version
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    // const address = "0x447Fd5eC2D383091C22B8549cb231a3bAD6d3fAf";
    let ethUsdPriceFeedAddress
    // verification on local networks
    if (developementChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    }
    else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // when go for localhost or hardhat we use a Mock
    const args = [ethUsdPriceFeedAddress]
    const FundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    // verification on other networks but local
    if (!developementChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(FundMe.address, {
            args
        })
    }
    log("-------------------------------")

}
module.exports.tag = ["all", "FundMe"]
// hardhat network is a blank blockchain and gets destroyed everytime our js ends
// Mocking is usually used for unit testing...
// Mocking is creating objects that simulates the behaviour of other objects...
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config();
// require("hardhat")
// require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.19" },
      { version: "0.8.8" },
      { version: "0.6.6" },
    ]
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1
    }
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    }
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: COINMARKET_API_KEY,
    token: "MATIC"
  },
  paths: {
    test: "./test"
  }
};

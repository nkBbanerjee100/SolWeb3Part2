const { getNamedAccounts, ethers, network } = require("hardhat")
const { developementChains } = require("../../helper-hardhat-config")
// const { hardhat } = require("hardhat")
const { assert } = require("chai")
const { networks } = require("../../hardhat.config")
const { getBalance } = require("ethers")
// we are gonna run it only if we are not on any developement chain...run only on testnet
developementChains.includes(networks.name) ? describe.skip :
    describe("FundMe", async function () {
        let fundMe
        let deployer
        const sendValue = ethers.parseEther("1");
        beforeEach(async () => {
            // const accounts = await ethers.getSigners()
            // deployer = accounts[0]
            deployer = (await getNamedAccounts()).deployer
            fundMe = await ethers.getContractAt("FundMe", deployer)
        })
        it("allows people to fund and withdraw", async function () {
            await fundMe.fund({ value: sendValue })
            await fundMe.withdraw()
            const endingBalance = await ethers.provider.getBalance(fundMe.target)
            assert.equal(endingBalance.toString(), "9999999923310639738112")
        })
    })
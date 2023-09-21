const { getNamedAccounts, ethers } = require("hardhat")
async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContractAt("FundMe", deployer)
    console.log("Funding...")
    const transactionResponse = await fundMe.fund({ value: ethers.parseEther("0.1") })
    await transactionResponse.wait(1)
    console.log("funded...");
}
main().then(() => process.exit(0)).catch((error) => {
    console.log(error);
    process.exit(1)
})
// command - yarn hardhat node -> + -> yarn hardhat run scripts/fund.js
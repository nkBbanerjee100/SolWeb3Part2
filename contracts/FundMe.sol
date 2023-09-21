// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./PriceCoverter.sol";

error FundMe_NotOwner();

// write interfaces,libraries just above to contracts
/**
 * @title A contract for crowd funding
 * @author NK Banerjee
 * @notice This contract is to demo a simple funding contract
 * @dev This implements price feeds as our library
 */
contract FundMe {
    // Type Declarations
    using PriceConverter for uint256; // this PriceConverter is a Library
    uint256 public constant MINM_USD = 50 * 1e18; // for gas optimization as they don't get stored like storage data types
    // blockchain nodes cannot make HTTP calls so we need a decentralized network
    address[] public funders;
    address public immutable i_owner; // for gas optimization as they don't get stored like storage data types
    // to check how much money does user send (below code)
    // State Variables
    mapping(address => uint256) public addressToAmmountFunded;
    modifier onlyOwner() {
        // require(msg.sender == i_owner,"sender isnot owner");
        if (msg.sender != i_owner) {
            revert FundMe_NotOwner();
        }
        _; // doing the rest of the code...
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // if someone wants to send ETH without the proper func call..in this case fund() then
    // receive() -> no need to write func ib bn front as solidity knows that it's a special func
    // fallback()
    // receive() external payable {
    //     fund();
    // }

    // fallback() external payable {
    //     fund();
    // }

    /**
     * @notice This function funds this contract
     * @dev This implements price feeds as our library
     */
    function fund() public payable {
        // require-revert
        // require is like if-else
        // though I haven't send any params still it will run as it will expect msg.value as it's 1st param
        require(
            (msg.value.getConversionRate(priceFeed)) >= MINM_USD,
            "Didn't send enogh !!!"
        );
        addressToAmmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender); // msg.sender means whatever address is sending the money.
        // emit Funded(msg.sender, msg.value);
    }

    AggregatorV3Interface public priceFeed;

    function withdraw() public payable onlyOwner {
        // memory cannt be used with mapping...
        // memory is lot cheaper
        address[] memory fundersArr;
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = fundersArr[funderIndex];
            addressToAmmountFunded[funder] = 0;
        }
        // resetting the array
        funders = new address[](0);
        // Sending ETH from a Contract
        // transfer
        // msg.sender = address
        // payable(msg.sender) = payable address
        // to send ETH we need payable address.
        // payable(msg.sender).transfer(address(this).balance); this throws error
        // send
        bool sendSuccess = payable(msg.sender).send(address(this).balance);
        require((sendSuccess), "Failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Calling Failed");
        revert();
    }
}
// Libraries are similar to contracts..cann't send ethers...
// NatSpec -> formatting style...Natural Language Specification Format...uses Doxygen
//

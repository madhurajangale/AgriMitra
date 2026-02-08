import Web3 from "web3";
import FarmerMarketABI from "../abis/FarmerMarket.json"; // you’ll create this file next

const CONTRACT_ADDRESS = "0xDc6Ae366F31546813ef8E3fC9b20BBe951870445";

let web3;
let contract;
let accounts;

export const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(FarmerMarketABI.abi, CONTRACT_ADDRESS);
    console.log("Connected account:", accounts[0]);
    return { web3, contract, accounts };
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};

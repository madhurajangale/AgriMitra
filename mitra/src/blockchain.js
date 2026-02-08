import Web3 from "web3";
import FarmerMarket from "./abis/FarmerMarket.json";

// Connect directly to Ganache
const GANACHE_URL = "http://127.0.0.1:7545";
const DEFAULT_ACCOUNT = "0xbaba75C7053975e66C838C7d9180daA68c4fB10C"; // replace with your Ganache account

let web3;
let contract;
let accounts;

export const initBlockchain = async () => {
  // 1️⃣ Connect to Ganache
  web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL));

  // 2️⃣ Get accounts directly from Ganache
  accounts = await web3.eth.getAccounts();

  // 3️⃣ Load deployed contract
  const networkId = await web3.eth.net.getId();
  const networkData = FarmerMarket.networks[networkId];

  if (!networkData) {
    throw new Error("Smart contract not deployed to Ganache network!");
  }

  contract = new web3.eth.Contract(FarmerMarket.abi, networkData.address);

  console.log("✅ Connected to Ganache");
  console.log("📦 Contract Address:", networkData.address);
  console.log("👤 Using Account:", accounts[0]);

  return { web3, contract, accounts };
};

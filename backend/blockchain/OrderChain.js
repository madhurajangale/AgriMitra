const { ethers } = require("ethers");
require("dotenv").config();

const ABI = require("../abi/AgrimitraOrder.json");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.AGRIMITRA_ORDER_ADDRESS,
  ABI,
  wallet
);

async function storeOrderOnChain(order) {
  const tx = await contract.placeOrder(
    process.env.FARMER_WALLET, // or map farmer → wallet
    order.customerName,
    order.farmerName,
    order.item,
    order.quantity,
    order.totalPrice
  );

  await tx.wait();
  return tx.hash;
}

module.exports = { storeOrderOnChain };

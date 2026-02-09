import { ethers } from "ethers";
import dotenv from "dotenv";
import AgrimitraABI from "../abi/AgrimitraOrder.json" with { type: "json" };


dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.ORDER_ADDRESS,
  AgrimitraABI.abi,
  wallet
);

export const storeOrderOnChain = async ({
  customerName,
  farmerName,
  item,
  quantity,
  totalPrice,
}) => {
  const tx = await contract.placeOrder(
    process.env.FARMER_WALLET,
    customerName,
    farmerName,
    item,
    quantity,
    totalPrice
  );

  await tx.wait();
  return tx.hash;
};

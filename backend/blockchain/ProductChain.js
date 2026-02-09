import { ethers } from "ethers";
import productABI from "../abi/AgrimitraProduct.json" with { type: "json" };
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.AGRIMITRA_PRODUCT_ADDRESS,
  productABI.abi,
  wallet
);

export const storeProductOnChain = async ({
  name,
  farmer,
  quantity,
  unit,
  market_price,
  delivery_charge,
  category,
}) => {
  const tx = await contract.addProduct(
    name,
    farmer,
    quantity,
    unit,
    market_price,
    delivery_charge,
    category
  );

  const receipt = await tx.wait();
  return receipt.hash;
};

const hre = require("hardhat");

async function main() {
  const ProductContract =  await hre.ethers.getContractFactory("AgrimitraProduct");
  const productContract = await ProductContract.deploy();

  await productContract.waitForDeployment();

  console.log("AgrimitraProduct deployed to:", await productContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

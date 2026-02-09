const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying AgrimitraOrder contract...");

  const AgrimitraOrder = await hre.ethers.getContractFactory("AgrimitraOrder");
  const agrimitraOrder = await AgrimitraOrder.deploy();

  await agrimitraOrder.waitForDeployment();

  const contractAddress = await agrimitraOrder.getAddress();

  console.log("✅ AgrimitraOrder deployed to:");
  console.log("📍 Address:", contractAddress);
  console.log("🌐 Network: Sepolia");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

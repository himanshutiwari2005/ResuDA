const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with:", deployer.address);

  const ResumeScore = await ethers.getContractFactory("ResumeScore");
  const resumeScore = await ResumeScore.deploy();
  await resumeScore.deployed();

  console.log("✅ Contract deployed to:", resumeScore.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

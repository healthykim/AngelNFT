import { ethers } from "hardhat";

async function main() {

  const AngelToken = await ethers.getContractFactory("AngelToken");
  const angelToken = await AngelToken.deploy();

  await angelToken.deployed();

  console.log(`Angel Token was deployed to ${angelToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

async function main() {

  const AngelToken = await ethers.getContractFactory("AngelToken");
  const angelToken = await AngelToken.deploy();

  const Donate = await ethers.getContractFactory("Donate");
  const donate = await Donate.deploy(angelToken.address);

  await angelToken.deployed();
  await donate.deployed();

  console.log(`Angel Token was deployed to ${angelToken.address}`);
  console.log(`Donate was deployed to ${donate.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

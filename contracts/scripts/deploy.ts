import { ethers } from "hardhat";
import { Signer } from "ethers";

async function main() {

  const AngelToken = await ethers.getContractFactory("AngelToken");
  const angelToken = await AngelToken.deploy();

  const Donate = await ethers.getContractFactory("Donate");
  const donate = await Donate.deploy(angelToken.address);

  await angelToken.deployed();
  await donate.deployed();

  await donate.addDestination('0x165CD37b4C644C2921454429E7F9358d18A45e14', 'Ukraine Goverment');
  await donate.addDestination('0x9a5206d05aA62333aFd8299E2b57d76C0a4230F7', 'Test');

  console.log(`Angel Token was deployed to ${angelToken.address}`);
  console.log(`Donate was deployed to ${donate.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

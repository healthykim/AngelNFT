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

  /*Only for localhost*/
  const accounts = await ethers.getSigners();
  await donate.connect(accounts[0]).donate(0, true);
  await donate.connect(accounts[1]).donate(0, true);
  await donate.connect(accounts[2]).donate(0, true);
  await donate.connect(accounts[3]).donate(0, true);
  await donate.connect(accounts[0]).donate(0, true);
  await donate.connect(accounts[0]).donate(0, true);
  await donate.connect(accounts[3]).donate(0, true);
  // 0 - [1,5,6]
  // 1 - [2]
  // 2 - [3]
  // 3 - [4,7]
  await angelToken.connect(accounts[0]).setExchangeableToken(1);
  await angelToken.connect(accounts[0]).setExchangeableToken(6);
  await angelToken.connect(accounts[1]).requestExchange(2, 1);
  await angelToken.connect(accounts[2]).requestExchange(3, 1);
  await angelToken.connect(accounts[3]).requestExchange(4, 1);
  await angelToken.connect(accounts[3]).requestExchange(7, 6);

  console.log(`Angel Token was deployed to ${angelToken.address}`);
  console.log(`Donate was deployed to ${donate.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

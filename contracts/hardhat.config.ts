import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'solidity-docgen';
import "hardhat-gas-reporter";


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: 
      {
        optimizer: 
          {
            enabled: true,
            runs: 10000,
          }
      }
  },
  docgen: {},
  gasReporter: {
    enabled: true,
    currency: "ETH",
    //coinmarketcap: process.env.COINMARKETCAP_API_KEY, //to fetch gas data
  }
};

export default config;
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
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
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/rkGCoetVrGUD3bVzI4JAvK8MahPmbj0x`,
      accounts: ['6df173a0377142a373a474151da2e848e23afb9db170973b54ea8bccbbc0af96'],
    }
    
  }
};

export default config;
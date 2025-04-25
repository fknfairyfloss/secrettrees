import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

// Default to development values if environment variables are not set
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const POLYGON_MUMBAI_URL = process.env.POLYGON_MUMBAI_URL || "https://rpc-mumbai.maticvigil.com";
const POLYGON_MAINNET_URL = process.env.POLYGON_MAINNET_URL || "https://polygon-rpc.com";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    mumbai: {
      url: POLYGON_MUMBAI_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
    polygon: {
      url: POLYGON_MAINNET_URL,
      accounts: [PRIVATE_KEY],
      chainId: 137,
    },
  },
  paths: {
    sources: "./src/contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};

export default config; 
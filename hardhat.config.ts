import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";

// require("@nomicfoundation/hardhat-toolbox"); // for type define for ethers in hardhat

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  paths: {
    artifacts: "./src/artifacts"
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/SdR_BR6MTOAWCpJCzuLVB0X2gVahYFax",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  }
};

export default config;

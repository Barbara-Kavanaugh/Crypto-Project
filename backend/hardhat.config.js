require("@nomicfoundation/hardhat-toolbox");
const dotenv= require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.ALCHEMY,
      account: [process.env.METAMASK]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};
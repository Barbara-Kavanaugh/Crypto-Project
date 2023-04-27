const BigNumber = require('bignumber.js');
const CryptoCrash = require('../artifacts/contracts/CryptoCrash.sol/CryptoCrash.json');

async function main() {
  const value = new BigNumber('CryptoCrash');

  const CryptoCrashFactory = await ethers.getContractFactory(CryptoCrash.abi, value);
  const cryptoCrash = await CryptoCrashFactory.deploy();

  await cryptoCrash.deployed();

  console.log("Contract deployed to address:", cryptoCrash.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });
async function main() {
    const CryptoCrash = await ethers.getContractFactory("CryptoCrash");
 
    // Start deployment, returning a promise that resolves to a contract object
    const crypto_crash = await CryptoCrash.deploy();
    console.log("Contract deployed to address:", crypto_crash.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
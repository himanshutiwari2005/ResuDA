require("@nomiclabs/hardhat-ethers"); // ✅ Required to make `ethers` work in scripts
require("dotenv").config();


require("dotenv").config({ path: __dirname + "/.env" }); // ⬅️ absolute path to ensure load

// console.log("✅ Loaded RPC:", process.env.RPC_URL);
// console.log("✅ PK Length:", process.env.PRIVATE_KEY?.length);

module.exports = {
  solidity: "0.8.20",
  networks: {
    monad: {
      url: process.env.RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 10143,
    }
  }
};

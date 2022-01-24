const path = require("path");
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = fs.readFileSync(".secret").toString().trim();
const polygonScanApiKey = fs.readFileSync(".polygon-scan-api-key").toString().trim();
const infuraApiKey = fs.readFileSync(".infura-api-key").toString().trim();

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.infura.io/v3/${infuraApiKey}`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "pragma",
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    polygonscan: polygonScanApiKey
  }
};

import '@nomiclabs/hardhat-ethers';
import { Contract } from '@nomiclabs/hardhat-ethers/types';
import { ethers, network, artifacts, } from "hardhat";

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contracts with the account:", await deployer.getAddress());
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Parcel");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token: Contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir))
    fs.mkdirSync(contractsDir);

  fs.writeFileSync(contractsDir + "/contract-address.json", JSON.stringify({ Token: token.address }, undefined, 2));

  const TokenArtifact = artifacts.readArtifactSync("Parcel");
  fs.writeFileSync(contractsDir + "/Parcel.json", JSON.stringify(TokenArtifact, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
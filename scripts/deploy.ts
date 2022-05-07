import '@nomiclabs/hardhat-ethers';
import { } from '@nomiclabs/hardhat-ethers/types';
import { ethers, network, artifacts, } from "hardhat";
import { getGalleryAddress } from '../test/helpers';
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

  const Gallery = await ethers.getContractFactory("Gallery");
  const GalleryFactory = await ethers.getContractFactory("GalleryFactory");
  const TestNFT = await ethers.getContractFactory("TestNFT");
  const gallery = await Gallery.deploy();
  const testNft = await TestNFT.deploy(":D NFT", "DOINGUD");
  await testNft.deployed();
  await gallery.deployed();
  const galleryFactory = await GalleryFactory.deploy(gallery.address);
  await galleryFactory.deployed();



  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(galleryFactory.address, testNft.address);
}

function saveFrontendFiles(galleryFactory: string, testNft: string) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../app/src/contracts";

  if (!fs.existsSync(contractsDir))
    fs.mkdirSync(contractsDir);

  fs.writeFileSync(contractsDir + "/contract-address.json", JSON.stringify({ GalleryFactory: galleryFactory, TestNft: testNft }, undefined, 2));

  const TokenArtifact = artifacts.readArtifactSync("Gallery");
  const GalleryFactory = artifacts.readArtifactSync("GalleryFactory");
  const TestNFT = artifacts.readArtifactSync("TestNFT");
  fs.writeFileSync(contractsDir + "/Gallery.json", JSON.stringify(TokenArtifact, null, 2));
  fs.writeFileSync(contractsDir + "/GalleryFactory.json", JSON.stringify(GalleryFactory, null, 2));
  fs.writeFileSync(contractsDir + "/TestNFT.json", JSON.stringify(TestNFT, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

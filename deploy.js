//console interaction https://czhc.dev/2021/07/20/interacting-contracts-etherjs
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


async function main() {
  const name = "RealDigitalToken";
  const symbol = "RDT";
  const participant = "bpague";  // Set your participant name.
  const cnpj8 = 27118286000160;  // Set your 8-digit CNPJ.
  const reserve = "0xbe81F1f734A045CbA25334641bafd7F24386a45F";  // Set the reserve's address.
  const authority = "0xbe81F1f734A045CbA25334641bafd7F24386a45F";  // Set the authority's address.
  const admin = "0xbe81F1f734A045CbA25334641bafd7F24386a45F";  // Set the admin's address.

  const RealDigital = await hre.ethers.getContractFactory("RealDigital");
  const realDigital = await RealDigital.deploy(name, symbol, authority, admin);
  await realDigital.deployed();
  console.log("realDigital:", realDigital.address)

  const CBDCAccessControl = await hre.ethers.getContractFactory("CBDCAccessControl");
  const cbdCAccessControl = await CBDCAccessControl.deploy(authority, admin);
  await cbdCAccessControl.deployed();
  console.log("cbdCAccessControl:", cbdCAccessControl.address)

  const AddressDiscovery = await hre.ethers.getContractFactory("AddressDiscovery");
  const addressDiscovery = await AddressDiscovery.deploy(admin);
  await addressDiscovery.deployed();
  console.log("addressDiscovery:", addressDiscovery.address)

  const KeyDictionary = await hre.ethers.getContractFactory("KeyDictionary");
  const keyDictionary = await KeyDictionary.deploy(realDigital.address);
  await keyDictionary.deployed();
  console.log("keyDictionary:", keyDictionary.address)

  const RealDigitalDefaultAccount = await hre.ethers.getContractFactory("RealDigitalDefaultAccount");
  const realDigitalDefaultAccount = await RealDigitalDefaultAccount.deploy(realDigital.address, authority, admin);
  await realDigitalDefaultAccount.deployed();
  console.log("realDigitalDefaultAccount:", realDigitalDefaultAccount.address)

  const RealDigitalEnableAccount = await hre.ethers.getContractFactory("RealDigitalEnableAccount");
  const realDigitalEnableAccount = await RealDigitalEnableAccount.deploy(cbdCAccessControl.address);
  await realDigitalEnableAccount.deployed();
  console.log("realDigitalEnableAccount:", realDigitalEnableAccount.address)

  const RealTokenizado = await hre.ethers.getContractFactory("RealTokenizado");
  const realTokenizado = await RealTokenizado.deploy(name, symbol, authority, admin, participant, cnpj8, reserve);
  await realTokenizado.deployed();
  console.log("realTokenizado:", realTokenizado.address)

  const STR = await hre.ethers.getContractFactory("STR");
  const str = await STR.deploy(realDigital.address);
  await str.deployed();
  console.log("STR:", str.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




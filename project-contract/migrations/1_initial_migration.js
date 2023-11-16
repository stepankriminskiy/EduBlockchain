const GPAToken = artifacts.require("GPAToken");
const DiplomaCertificate = artifacts.require("DiplomaCertificate");
const UniversityToken = artifacts.require("UniversityToken");

module.exports = async function(deployer) {

   // Deploy the contracts
  await deployer.deploy(GPAToken);
  const gpaToken = await GPAToken.deployed();

  await deployer.deploy(DiplomaCertificate);
  const diplomaCertificate = await DiplomaCertificate.deployed();

  await deployer.deploy(UniversityToken, GPAToken.address, DiplomaCertificate.address);
  const universityToken = await UniversityToken.deployed();

  // Call setUniversityContract on GPAToken and DiplomaCertificate
  await gpaToken.setUniversityContract(universityToken.address);
  await diplomaCertificate.setUniversityContract(universityToken.address);

};
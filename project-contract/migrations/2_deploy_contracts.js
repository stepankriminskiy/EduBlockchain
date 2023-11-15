const ERC20 = artifacts.require("ERC20");
const ERC721 = artifacts.require("ERC721");
const ERC1155 = artifacts.require("ERC1155");

module.exports = async function (deployer) {
  // Deploy ERC20 and ERC721 if not already deployed
  await deployer.deploy(ERC20);
  const erc20 = await ERC20.deployed();

  await deployer.deploy(ERC721);
  const erc721 = await ERC721.deployed();

  // Deploy ERC1155 with ERC20 and ERC721 addresses
  await deployer.deploy(ERC1155, erc20.address, erc721.address);
  const erc1155 = await ERC1155.deployed();

  // Call setUniversityContract on ERC20 and ERC721 contracts with the ERC1155 address
  await erc20.setUniversityContract(erc1155.address);
  await erc721.setUniversityContract(erc1155.address);

};
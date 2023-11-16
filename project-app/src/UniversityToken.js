import Web3 from 'web3';
import UniversityTokenABI from './UniversityToken.json'; // Path to your ABI file

const getContractInstance = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = UniversityTokenABI.networks[networkId];
  const contract = new web3.eth.Contract(
    UniversityTokenABI.abi,
    deployedNetwork && deployedNetwork.address,
  );

  return contract;
};

export default getContractInstance;
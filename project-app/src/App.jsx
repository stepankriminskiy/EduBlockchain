import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import UniversityTokenABI from './UniversityToken.json'; // Your ABI file path

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [gpa, setGpa] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [studentAddress, setStudentAddress] = useState('');
  const [gpaTokenAddress, setGpaTokenAddress] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(userAccounts);

          const uniTokenContract = new web3Instance.eth.Contract(
            UniversityTokenABI.abi, 
            "0x381B1bF9d39C7b5a28b0B0E214aD7b1dE478a966"
          );
          setContract(uniTokenContract);
        } catch (error) {
          console.error("Could not connect to MetaMask:", error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);
  const handleCheckGPA = async () => {
    try {
      const response = await contract.methods.getGPAOf(studentAddress).call();
      setGpa(response);
    } catch (error) {
      console.error("Error fetching GPA:", error);
    }
  };

  const handleGetGpaTokenAddress = async () => {
    try {
      const response = await contract.methods.getGpaTokenAddress().call();
      setGpaTokenAddress(response);
    } catch (error) {
      console.error("Error fetching GPA Token Address:", error);
    }
  };

  return (
    <div>
      <h2>University Token App</h2>
      <div>
        {accounts.length > 0 ? (
          <p>Connected Account: {accounts[0]}</p>
        ) : (
          <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
            Connect to MetaMask
          </button>
        )}
      <div>
        <input 
          type="text" 
          value={studentAddress}
          onChange={e => setStudentAddress(e.target.value)}
          placeholder="Enter student address"
        />
        <button onClick={handleCheckGPA}>Check GPA</button>
        <p>GPA: {gpa}</p>
      </div>
      <div>
        <button onClick={handleGetGpaTokenAddress}>Get GPA Token Address</button>
        <p>GPA Token Address: {gpaTokenAddress}</p>
      </div>
      </div>
    </div>
  );
}

export default App;
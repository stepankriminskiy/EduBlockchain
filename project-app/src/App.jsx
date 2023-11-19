import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css'
import UniversityTokenABI from './UniversityToken.json'; // Your ABI file path

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [gpa, setGpa] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState('0');
  const [studentAddressForGPA, setStudentAddressForGPA] = useState('');
  const [studentAddressForCertificates, setStudentAddressForCertificates] = useState('');
  const [universityAddress, setUniversityAddress] = useState('');
  const [newGPA, setNewGPA] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [gpaTokenAddress, setGpaTokenAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [certifierAddress, setCertifierAddress] = useState('');
  const [dateIssued, setDateIssued] = useState('');
  const [certificateDescription, setCertificateDescription] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [isUniversity, setIsUniversity] = useState(false);
  const [isCertifier, setIsCertifier] = useState(false);
  const [tokenIdToRemove, setTokenIdToRemove] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const contractAddress = "0xcb57cf8800d9f24D35cd522d66763223E776F9D6";

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          const userAccounts = await web3Instance.eth.requestAccounts();
          setAccounts(userAccounts);
          if (userAccounts.length > 0) {
            const accountBalance = await web3Instance.eth.getBalance(userAccounts[0]);
            setBalance(web3Instance.utils.fromWei(accountBalance, 'ether'));
          }

          const uniTokenContract = new web3Instance.eth.Contract(
            UniversityTokenABI.abi, 
            contractAddress
          );
          setContract(uniTokenContract);

          window.ethereum.on('accountsChanged', async (changedAccounts) => {
            setAccounts(changedAccounts);
            if (changedAccounts.length > 0) {
              const accountBalance = await web3Instance.eth.getBalance(changedAccounts[0]);
              setBalance(web3Instance.utils.fromWei(accountBalance, 'ether'));
            }
          });

        } catch (error) {
          console.error("Could not connect to MetaMask:", error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const checkRoles = async () => {
      if (contract && accounts.length > 0) {
        const ownerStatus = await contract.methods.isOwner(accounts[0]).call();
        const universityStatus = await contract.methods.isUniversity(accounts[0]).call();
        const certifierStatus = await contract.methods.isCertifier(accounts[0]).call();

        setIsOwner(ownerStatus);
        setIsUniversity(universityStatus);
        setIsCertifier(certifierStatus);
      }
    };

    checkRoles();
  }, [contract, accounts]); 


  const handleCheckGPA = async () => {
    try {
      console.log("Checking GPA for address:", studentAddress);
      const response = await contract.methods.getGPAOf(studentAddress).call();
      console.log("GPA response:", response.toString());
      setGpa(response.toString());
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

  const handleAddTrustedUniversity = async () => {
    try {
      await contract.methods.addTrustedUniversity(universityAddress).send({ from: accounts[0] });
      console.log('Trusted university added');
    } catch (error) {
      console.error("Error adding trusted university:", error);
    }
  };

  const handleRemoveTrustedUniversity = async () => {
    try {
      await contract.methods.removeTrustedUniversity(universityAddress).send({ from: accounts[0] });
      console.log('Trusted university removed');
    } catch (error) {
      console.error("Error removing trusted university:", error);
    }
  };
  const handleRemoveToken = async () => {
    try {
      await contract.methods.revokeToken(tokenIdToRemove).send({ from: accounts[0] });
      console.log(`Token with ID ${tokenIdToRemove} removed successfully`);
      setTokenIdToRemove(''); // Resetting the input field after removal
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  const handleSetGPA = async () => {
    try {
      await contract.methods.setGPA(studentAddressForGPA, newGPA).send({ from: accounts[0] });
      console.log('GPA set successfully');
    } catch (error) {
      console.error("Error setting GPA:", error);
    }
  };

  const handleMintCertification = async () => {
    try {
      await contract.methods.mintCertification(studentAddressForCertificates, certificateDescription, dateIssued, imageUrl).send({ from: accounts[0] });
      console.log('Certificate minted successfully');
    } catch (error) {
      console.error("Error minting certificate:", error);
    }
  };
  const handleFetchCertificates = async () => {
    try {
      const fetchedCertificates = await contract.methods.getCertificatesOf(studentAddress).call();
      setCertificates(fetchedCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
  const handleAddTrustedCertifier = async () => {
    try {
      await contract.methods.addTrustedCertificateEntities(certifierAddress).send({ from: accounts[0] });
      console.log('Trusted certifier added successfully');
    } catch (error) {
      console.error("Error adding trusted certifier:", error);
    }
  };
  
  const handleRemoveTrustedCertifier = async () => {
    try {
      await contract.methods.removeTrustedCertificateEntities(certifierAddress).send({ from: accounts[0] });
      console.log('Trusted certifier removed successfully');
    } catch (error) {
      console.error("Error removing trusted certifier:", error);
    }
  };

  return (
    <div className="content-container">
    {/* Title Container */}
    <div className="title-container">
      <h2>University Token App</h2>
    </div>

    {/* Main Content Container */}
    <div className="main-content">
      {/* MetaMask Connection */}
      {accounts.length > 0 ? (
        <p>Connected Account: {accounts[0]}</p>
      ) : (
        <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
          Connect to MetaMask
        </button>
      )}

      {/* GPA Section */}
      <div>
        <h3>View Student GPA</h3>
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
        <h3>View Certificates</h3>
        <input type="text" value={studentAddress} onChange={e => setStudentAddress(e.target.value)} placeholder="Owner Address" />
        <button onClick={handleFetchCertificates}>Fetch Certificates</button>
        {certificates.length > 0 ? (
          <ul>
            {certificates.map((certificate, index) => (
              <li key={index}>

                <p>Token ID: {certificate.tokenId.toString()}</p>
                {certificate.imageUrl && (
          <img src={certificate.imageUrl} alt={`Certificate ${certificate.tokenId}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                )}
                <p>Description: {certificate.description}</p>
                <p>Date Issued: {certificate.dateIssued}</p>
 
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No certificates found</p>
        )}
      </div>


      {isOwner &&(<div>
        <h3>Add or Remove Trusted Universities</h3>
      <input type="text" value={universityAddress} onChange={e => setUniversityAddress(e.target.value)} placeholder="Enter university address" />
        <button onClick={handleAddTrustedUniversity}>Add Trusted University</button>
        <button onClick={handleRemoveTrustedUniversity}>Remove Trusted University</button>
      </div>
      )}
      {isOwner && (
        <div>
        <h3>Add or Remove Trusted Certifiers</h3>
        <input 
          type="text" 
          value={certifierAddress} 
          onChange={e => setCertifierAddress(e.target.value)} 
          placeholder="Enter certifier address" 
        />
        <button onClick={handleAddTrustedCertifier}>Add Trusted Certifier</button>
        <button onClick={handleRemoveTrustedCertifier}>Remove Trusted Certifier</button>
      </div>


      )}
        {isUniversity &&(
      <div>
        <h3>Set GPA for Student</h3>
        <input 
          type="text" 
          value={studentAddressForGPA} 
          onChange={e => setStudentAddressForGPA(e.target.value)} 
          placeholder="Enter student address for GPA" 
        />
        <input 
          type="text" 
          value={newGPA} 
          onChange={e => setNewGPA(e.target.value)} 
          placeholder="Enter new GPA" 
        />
        <button onClick={handleSetGPA}>Set GPA</button>
        </div>)}
        {isCertifier &&(
        <div>
        <h3>Mint Certification</h3>
        <input type="text" value={studentAddressForCertificates} onChange={e => setStudentAddressForCertificates(e.target.value)} placeholder="Student Address" />
        <input type="text" value={certificateDescription} onChange={e => setCertificateDescription(e.target.value)} placeholder="Description" />
        <input type="date" value={dateIssued} onChange={e => setDateIssued(e.target.value)} />
        <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" />
        <button onClick={handleMintCertification}>Mint Certificate</button>
      </div>)}
      {isCertifier &&(
      <div>
        <h3>Remove Certificate/Token</h3>
        <input 
          type="text" 
          value={tokenIdToRemove} 
          onChange={e => setTokenIdToRemove(e.target.value)} 
          placeholder="Enter Token ID" 
        />
        <button onClick={handleRemoveToken}>Remove Token</button>
      </div>)}
      </div>
    </div>
  );
}

export default App;
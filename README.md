# About

## Link to project 
https://edublockchain.netlify.app/

## Overview
EduBlockchain is an innovative decentralized application (DApp) developed with the aim of streamlining the verification process of educational credentials. Deployed on the Sepolia Ethereum test network, this DApp leverages blockchain technology to offer a more efficient, secure, and transparent solution to the often cumbersome and time-consuming task of verifying academic achievements. Traditionally, employers and other verifying bodies face challenges like contacting schools and dealing with faxes or paperwork. EduBlockchain simplifies this process by enabling seamless verification through its web app, where one can easily access a student's academic credentials by entering their Ethereum address.


## Key Features
### Dynamic User Interface
Admin Functionality: As an administrator, you hold the capability to add or remove trusted universities and certification entities. This level of control ensures the integrity of the issuing institutions on the platform.

University Role: Universities have comprehensive privileges, including setting GPAs for students and minting both certificates and diplomas as NFTs. This functionality enables universities to issue verifiable and immutable educational documents directly on the blockchain.

Certification Entities: Certified entities have the ability to mint certificates, contributing to the diverse range of credentials available on EduBlockchain.

Student and Public Access: Any user, including students, can view the GPAs and minted NFTs (certificates and diplomas) associated with a specific Ethereum address. This feature promotes transparency and easy verification of academic credentials.

### Token Standards and Functionalities
ERC-20 Tokens for GPAs: GPAs are represented as ERC-20 tokens, offering a standardized and efficient method for managing academic scores.

ERC-721 Tokens for Certificates and Diplomas: Educational certificates and diplomas are minted as unique ERC-721 tokens (NFTs), ensuring the distinctiveness and ownership of each credential.

ERC-1155 for Combined Functionality: The DApp's smart contracts are designed in accordance with the ERC-1155 standard, blending the advantages of ERC-20 and ERC-721 tokens. This approach offers a holistic solution for handling educational credentials on the blockchain.

## Technology Stack
Solidity: The backbone of EduBlockchain's smart contracts, written in Ethereum's native language for smart contract development.

Truffle Suite: Employed for developing, testing, and deploying the smart contracts, and also for building the interactive user interface.

Web3.js: This JavaScript library connects the web interface to the Ethereum blockchain, enabling browser-based user interactions with the DApp.

Infura: Provides the necessary infrastructure for deploying the smart contracts on the Sepolia test network, granting global access and interaction without running a full Ethereum node.

# Interacting with EduBlockchain:

## Admins: Authorize or revoke the status of universities and certification entities.
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/917ae750-b346-4b01-b711-8eabb2454bb5)


## Universities: Assign GPAs, mint certificates and diplomas.
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/3ca18494-cc99-4862-b0c7-defedbd6c15d)
### GPA Setting 
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/ae7d11e5-dab3-40da-bfd3-88f4e85ce037)
### Minting a diploma
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/e9652c17-6a72-4204-b2d4-1712925e6abc)



## Certification Entities: Mint certificates.
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/742d3a44-6f96-47ad-92f1-7087bd128f1c)

### Minting a certificate
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/6fcd9d74-9efb-42ee-a5ec-83f2c8a0b73b)

## Students/Public: View any Ethereum address's GPAs and minted credentials.
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/cb1e4c18-467e-47f2-9ba6-a5871887606e)

## Example of fetching a student credentials
![image](https://github.com/stepankriminskiy/EduBlockchain/assets/98437298/71aae218-3242-437e-bc1b-d4210855cabf)




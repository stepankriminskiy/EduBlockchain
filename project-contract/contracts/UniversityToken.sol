// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./GPAToken.sol";
import "./DiplomaCertificate.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniversityToken is Ownable {
    GPAToken private _gpaToken;
    DiplomaCertificate private _diplomaCertificate;

    mapping(address => bool) private _trustedUniversities;
    mapping(address => bool) private _trustedCertificationEntities;
    mapping(uint256 => address) private tokenMinters;
    
    struct CertificateData {
        uint256 tokenId;
        string description;
        string dateIssued;
        string imageUrl;
    }

    modifier onlyTrustedUniversities() {
        require(_trustedUniversities[msg.sender], "Not an authorized University");
        _;
    }
    modifier onlyCertificationEntities() {
        require(_trustedCertificationEntities[msg.sender], "Not an authorized Certification entity");
        _;
    }

    constructor(address gpaTokenAddress, address diplomaCertificateAddress){
        _gpaToken = GPAToken(gpaTokenAddress);
        _diplomaCertificate = DiplomaCertificate(diplomaCertificateAddress);
    }
    
    function getGpaTokenAddress() public view returns (address) {
        return address(_gpaToken);
    }

    function getDiplomaCertificateAddress() public view returns (address) {
        return address(_diplomaCertificate);
    }

    function addTrustedUniversity(address universityAddress) external onlyOwner {
        _trustedUniversities[universityAddress] = true;
        _trustedCertificationEntities[universityAddress] = true;
    }

    function removeTrustedUniversity(address universityAddress) external onlyOwner {
        _trustedUniversities[universityAddress] = false;
        _trustedCertificationEntities[universityAddress] = false;
    }

    function addTrustedCertificateEntities(address certificateEntityAddress) external onlyOwner {
        _trustedCertificationEntities[certificateEntityAddress] = true;
    }
    function removeTrustedCertificateEntities(address certificateEntityAddress) external onlyOwner {
        _trustedCertificationEntities[certificateEntityAddress] = false;
    }
    //can only be called by universities
    function setGPA(address student, uint256 newGPA) external onlyTrustedUniversities{
        _gpaToken.setGPA(student, newGPA);
    }
    //mint's certification or DIPLOMA. can be called by universities or other trusted certifiers
    function mintCertification(address student, string memory description, string memory dateIssued, string memory imageUrl) external onlyCertificationEntities{
        _diplomaCertificate.mint(student, description, dateIssued, imageUrl);
        uint256 newTokenId = _diplomaCertificate.getCurrentTokenId(); // Assuming the token ID is sequential and based on totalSupply
        tokenMinters[newTokenId] = msg.sender;
    }

    function isUniversity(address UniversityAddress)external view returns (bool){
        return _trustedUniversities[UniversityAddress];
    }

    function isCertifier(address CertifierAddress)external view returns (bool){
        return _trustedCertificationEntities[CertifierAddress];
    }
    function isOwner(address _address) public view returns (bool) {
        return _address == owner();
    }

    // Function to get the university that minted a specific token.
    function getTokenMinter(uint256 tokenId) external view returns (address) {
        return tokenMinters[tokenId];
    }
        // Function to allow a university to revoke (burn) a token they minted.
    function revokeToken(uint256 tokenId) external {
        require(tokenMinters[tokenId] == msg.sender, "Only the university/institute that minted the token can revoke it.");
        _diplomaCertificate.burn(tokenId); // Assuming a burn function exists in the DiplomaCertificate contract.
    }
    //anyone can view the gpa of a student if student gives address
    function getGPAOf(address student) external view returns (uint256) {
        return _gpaToken.balanceOf(student); 
    }
    //anyone can view the certificates of the student if student gives address
    function getCertificatesOf(address owner) external view returns (CertificateData[] memory) {
        uint256 tokenCount = _diplomaCertificate.balanceOf(owner);
        CertificateData[] memory certificates = new CertificateData[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = _diplomaCertificate.tokenOfOwnerByIndex(owner, i);
            (string memory description, string memory dateIssued, string memory imageUrl) = _diplomaCertificate.getCertificateDetails(tokenId);
        
            certificates[i] = CertificateData({
                tokenId: tokenId,
                description: description,
                dateIssued: dateIssued,
                imageUrl: imageUrl
            });
        }

        return certificates;
    }

}
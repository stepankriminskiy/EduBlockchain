// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DiplomaCertificate is ERC721Enumerable{
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    address private admin;
    address private UniversityContract;

    struct CertificateData {
        string description;
        string dateIssued;
    }

    mapping(uint256 => CertificateData) private _certificateDetails;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    modifier onlyAdminOrUniversity() {
        require(msg.sender == admin || msg.sender == UniversityContract, "Not authorized");
        _;
    }

    constructor() ERC721("DiplomaCertificate", "DCERT") {
        admin = msg.sender;
    }

    function setUniversityContract(address universityContract) public onlyAdmin{
        UniversityContract = universityContract;
    }
    function getUniversityAddress() public view returns (address) {
        return UniversityContract;
    }
    
    function mint(address recipient, string memory description, string memory dateIssued) external onlyAdminOrUniversity {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(recipient, newTokenId);
        
        _certificateDetails[newTokenId] = CertificateData({
            description: description,
            dateIssued: dateIssued
        });
    }
    function burn(uint256 tokenId) external {
        require(msg.sender == UniversityContract, "Only UniversityToken can burn tokens.");
        _burn(tokenId); 
    }

    function getCurrentTokenId() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    function getCertificateDetails(uint256 tokenId) external view returns (string memory description, string memory dateIssued) {
        CertificateData memory certData = _certificateDetails[tokenId];
        return (certData.description, certData.dateIssued);
    }

}
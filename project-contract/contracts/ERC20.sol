// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GPAToken is ERC20 {
    address private admin;
    address private UniversityContract;
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    modifier onlyAdminOrUniversity() {
        require(msg.sender == admin || msg.sender == UniversityContract, "Not authorized");
        _;
    }

    constructor() ERC20("GPA Token", "GPA") {
        admin = msg.sender;

    }

    function setUniversityContract(address universityContract) public onlyAdmin{
        UniversityContract = universityContract;
    }
    
    function setGPA(address student, uint256 newGPA) public onlyAdminOrUniversity {
        uint256 currentGPA = balanceOf(student);
        _burn(student, currentGPA);
        _mint(student, newGPA);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CompanyCertificate is ERC721URIStorage {
    uint256 public tokenCounter;
    address public admin;
    string public logoURI;
    mapping(address => bool) public whitelistedEmployees;

    event AdminChanged(address indexed newAdmin);
    event EmployeeWhitelisted(address indexed employee);
    event EmployeeRemovedFromWhitelist(address indexed employee);
    event CompanyMinted(address indexed company, uint256 tokenId);
    event EmployeeMinted(address indexed employee, uint256 tokenId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not the admin");
        _;
    }

    constructor(
        string memory companyName,
        string memory companySymbol,
        address _admin,
        string memory _logoURI
    ) ERC721(companyName, companySymbol)  {
        tokenCounter = 0;
        admin = _admin;
        logoURI = _logoURI; 
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
        emit AdminChanged(newAdmin);
    }

    function whitelistEmployee(address _employee) public onlyAdmin {
        whitelistedEmployees[_employee] = true;
        emit EmployeeWhitelisted(_employee);
    }

    function removeEmployeeFromWhitelist(address _employee) public onlyAdmin {
        whitelistedEmployees[_employee] = false;
        emit EmployeeRemovedFromWhitelist(_employee);
    }

    function mintEmployeeCertificate() public returns (uint256) {
        require(whitelistedEmployees[msg.sender], "Caller is not whitelisted");
        whitelistedEmployees[msg.sender] = false;
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, logoURI); // 使用 logoURI 作为员工 NFT 的 URI
        tokenCounter += 1;
        emit EmployeeMinted(msg.sender, newTokenId);
        return newTokenId;
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CompanyCertificate.sol";

contract CompanyFactory {
    event CompanyCreated(address indexed companyAddress, address indexed admin);

    function createCompany(
        string memory companyName,
        string memory companySymbol,
        address admin,
        string memory logoURI
    ) public returns (address) {
        CompanyCertificate newCompany = new CompanyCertificate(companyName, companySymbol, admin, logoURI);
        emit CompanyCreated(address(newCompany), admin);
        return address(newCompany);
    }
}


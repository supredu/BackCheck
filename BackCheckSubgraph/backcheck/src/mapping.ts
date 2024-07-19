import { BigInt } from "@graphprotocol/graph-ts"
import {
  CompanyCreated,
  EmployeeMinted
} from "../generated/CompanyFactory/CompanyFactory"
import { Company, EmployeeCertificate } from "../generated/schema"
import { CompanyCertificate } from "../generated/templates"

export function handleCompanyCreated(event: CompanyCreated): void {
  let company = new Company(event.params.companyAddress.toHex())
  company.name = event.params.name
  company.symbol = event.params.symbol
  company.admin = event.params.admin
  company.logoURI = event.params.logoURI
  company.createdAt = event.block.timestamp
  company.save()

  // Create a new data source for the CompanyCertificate contract
  CompanyCertificate.create(event.params.companyAddress)
}

export function handleEmployeeMinted(event: EmployeeMinted): void {
  let certificate = new EmployeeCertificate(event.params.tokenId.toHex())
  certificate.employee = event.params.employee
  certificate.company = event.address.toHex()
  certificate.tokenId = event.params.tokenId
  certificate.tokenURI = event.params.tokenURI
  certificate.mintedAt = event.block.timestamp
  certificate.save()
}


import companycertificateAbi from "./CompanyCertificate.json"

const ContractAddress="0x2047870dDde6521ee22048218bB6e7d46D694708";
const AdminAddress ="0xFCC7F5888bD3ed6De62f6fD82Dd8Ff8ee009Fc2b";
export  function getContractAddress(){
    return ContractAddress;
};

export  function getCompanyAbi(){
    return companycertificateAbi;
};

export function getAdminAddress(){
    return AdminAddress;
}


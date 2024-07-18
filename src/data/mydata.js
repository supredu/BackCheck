import companycertificateAbi from "./CompanyCertificate.json"

const ContractAddress="0xCB57190B400a1a215673BF8Cd751B90fb4e08788";
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


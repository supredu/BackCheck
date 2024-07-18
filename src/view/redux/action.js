// src/actions/index.js
export const setData = data => ({
    type: 'SET_DATA',
    payload: data
});


export const setAddress = data=>({
    type: 'SET_ADDRESS',
    payload: data
})


  
  export const setNickName = (nickName) => ({
    type: 'SET_NICKNAME',
    payload: nickName,
  });
  
  export const setLoggedIn = (isLoggedIn) => ({
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  });
  
  export const setWalletAddress = (walletAddress) => ({
    type: 'SET_WALLET_ADDRESS',
    payload: walletAddress,
  });

  
  export const addCertificateInfo = (certificate) => ({
    type: 'ADD_CERTIFICATEINFO',
    payload: certificate,
  });

  export const addWhilelist = (certificate) => ({
    type: 'ADD_WhileList',
    payload: certificate,
  });
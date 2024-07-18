import { createStore } from 'redux';

import { assets } from '../../assets/assets';

const initialState = {
 
    address: localStorage.getItem('address') || '',
    data: '',
    nickName: localStorage.getItem('nickName') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') ===  'true',
    walletAddress: localStorage.getItem('walletAddress') || '',
    isDiscordConnected: localStorage.getItem('isDiscordConnected') === 'true',
    certificateInfo : localStorage.getItem(`${localStorage.getItem('address')||''}_certificateInfo}`) ||   [
      ],
    whilelistAddress:  localStorage.getItem(`${localStorage.getItem('address')||''}_wallist}`) ||   [
],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload };
        case 'SET_ADDRESS':
                localStorage.setItem('address', action.payload);
                return { ...state, address: action.payload };
        case 'SET_NICKNAME':
                localStorage.setItem('nickName', action.payload);
                return { ...state, nickName: action.payload };
        case 'SET_LOGGED_IN':
                localStorage.setItem('isLoggedIn', action.payload);
                return { ...state, isLoggedIn: action.payload };
        case 'SET_WALLET_ADDRESS':
                localStorage.setItem('walletAddress', action.payload);
                return { ...state, walletAddress: action.payload };
        case 'SET_DISCORD_CONNECTED':
                localStorage.setItem('isDiscordConnected', action.payload);
                return { ...state, isDiscordConnected: action.payload };
        case 'ADD_CERTIFICATEINFO':
                const storedCertificates = localStorage.getItem(`${localStorage.getItem('address')}_certificateInfo`);
                const certificates = storedCertificates ? JSON.parse(storedCertificates) : [];  

                const newCertificateInfo = [...certificates, action.payload];
                localStorage.setItem(`${localStorage.getItem('address')}_certificateInfo`, JSON.stringify(newCertificateInfo));
                return { ...state, certificateInfo: newCertificateInfo };
        case "ADD_WhileList":
                const wallistCertificates = localStorage.getItem(`${localStorage.getItem('address')}_wallist`);
                const wallist = wallistCertificates ? JSON.parse(wallistCertificates) : [];  
                const newWalllistInfo = [...wallist, action.payload];
                localStorage.setItem(`${localStorage.getItem('address')}_wallist`, JSON.stringify(newWalllistInfo));
                return { ...state, whilelistAddress: newWalllistInfo };
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;
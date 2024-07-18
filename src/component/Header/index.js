
import { Col, Row } from 'antd';
import React, { useState,useMemo,useEffect } from 'react';
import "./index.css"
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useDispatch,useSelector } from 'react-redux';
import { setAddress } from '../../view/redux/action';
import {  setNickName, setLoggedIn, setWalletAddress } from '../../view/redux/action';
import { v4 as uuidv4 } from 'uuid';
import { assets } from '../../assets/assets';
import { Menu,Avatar,Popover,Modal,Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const MyHeader = ()=>{
    const [current, setCurrent] = useState('mail');
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const storedNickName = useSelector(state => state.nickName);
    const storedIsLoggedIn = useSelector(state => state.isLoggedIn);
    const storedWalletAddress = useSelector(state => state.walletAddress);

  
    const items = [
        { label: 'Home', key: 'home' },
        { label: 'Company', key: 'company' },
        { label: 'Job Seeker', key: 'talent' }
      ];
      useEffect(() => {
        if (storedWalletAddress) {
            setWalletAddress(storedWalletAddress);
            dispatch(setAddress(storedWalletAddress));
        }
        if (storedNickName) {
            setNickName(storedNickName);
        }
        setIsLoggedIn(storedIsLoggedIn);
    }, [storedWalletAddress, storedNickName, storedIsLoggedIn]);
      useEffect(() => {

        // 检查 MetaMask 是否已安装
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            window.web3 = web3;
            // 获取当前连接的账户
            web3.eth.getAccounts().then(accounts => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    dispatch(setAddress(storedWalletAddress));
                }
            });
        } else {
            console.error("MetaMask is not installed. Please install it to use this app.");
        }
    }, []);
    const onClick = (e) => {
        setCurrent(e.key);
        navigate(`/${e.key}`);
    };
    const connectWalletHandler = async () => {
      if (window.ethereum) {
        try {
            // Request permissions to access accounts
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {}
                }]
            });

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            dispatch(setWalletAddress(accounts[0]));
            dispatch(setAddress(accounts[0]));
            console.log("Connected account:", accounts[0]);
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        console.error("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const switchAccount = async () => {
    navigate("/")
    if (window.ethereum) {
      try {
          // Request permissions to access accounts
          await window.ethereum.request({
              method: 'wallet_requestPermissions',
              params: [{
                  eth_accounts: {}
              }]
          });

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          dispatch(setWalletAddress(accounts[0]));
          dispatch(setAddress(accounts[0]));
      } catch (error) {
          console.error("Failed to switch account", error);
      }
  } else {
      console.error("MetaMask is not installed. Please install it to use this app.");
  }
};
   const handleLogin = async () => {
        await connectWalletHandler();
        dispatch(setLoggedIn(true));
        
        setIsModalOpen(true);
    };

    // const handleLogin = () => {
    //     // 连接钱包的函数   
    //     connectWalletHandler()

    //     setIsLoggedIn(!isLoggedIn);
    //     setIsModalOpen(true);
    //   };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

    const handleLogOut=()=>{
        const newId = uuidv4();
        dispatch(setLoggedIn(false));
        dispatch(setAddress(newId))
        dispatch(setWalletAddress(newId))
        
    }
     
    

      const content = (
        <div>
          <button className='profile_button' onClick={()=>navigate("information")}>个人信息</button>
          <button className='profile_button' onClick={switchAccount}>切换账号</button>
        </div>
      );

      const handleOk = () => {
        dispatch(setNickName(inputValue));
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
   return (
        <div className='header-container'>
            <Row>
                <Col span={5}>
                    <div className='logo-image'>
                        <img src={assets.logo} ></img>
                    </div>
                
                </Col>
                <Col span={11}>
                 <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{border: "none"}}  className="custom-menu" />
                </Col>
                <Col span={8}>
                    <div className='header-right'>
                    {isLoggedIn ? (
                        <div className='header-right-connected'>
                             <Popover content={storedWalletAddress} >
                                    <span className='header_address'>{storedWalletAddress}</span>

                            </Popover>

                            <Popover placement="bottom"  content={content} trigger="hover">
                                    <Avatar  style={{
                                        backgroundColor: '#fde3cf',
                                        color: '#f56a00',
                                        width: 50,
                                    }} className='custom-avatar'>
                                    {storedNickName}
                                    </Avatar>
                            </Popover>
                       
                        {/* <img src={assets.avatar} className='avatar' alt='Avatar' /> */}
                        </div>
                    ) : (
                        <img src={assets.metamaskLogo} className='metamask_logo' alt='Metamask Logo' />

                    )}
                     {isLoggedIn ? <button className='login-button' onClick={handleLogOut}>
                                    Logout
                                    </button>
                            : <button className='login-button' onClick={handleLogin}>
                                    Connect
                                    </button>}
                   
                    <Modal title="input nickname" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input size="large"  value={inputValue} onChange={handleInputChange}  placeholder="large size"  prefix={<UserOutlined />} />
                        </Modal>
                    </div>
                   
                </Col>
            </Row>
        </div>
    )
}

export default MyHeader;
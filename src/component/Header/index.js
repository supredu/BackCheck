
import { Col, Row } from 'antd';
import React, { useState,useMemo } from 'react';
import "./index.css"
import { useNavigate } from 'react-router-dom';

import { assets } from '../../assets/assets';
import { Menu,Avatar,Popover,Modal,Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const MyHeader = ()=>{
    const [current, setCurrent] = useState('mail');
    const [inputValue, setInputValue] = useState('');
    const [nickName,setNickName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [walletAddress,setWalletAddress] = useState("0x534F0536765C0d5510d7ac29b406fee69D189306");
    const [arrow, setArrow] = useState('Show');

    const navigate = useNavigate();

    const items = [
        { label: 'Home', key: 'home' },
        { label: 'Company', key: 'company' },
        { label: 'Job Seeker', key: 'talent' }
      ];
   
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(`/${e.key}`);
    };
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
        setIsModalOpen(true);
      };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

    const handleLogOut=()=>{
        setIsLoggedIn(!isLoggedIn);
    }
      const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
          return false;
        }
        if (arrow === 'Show') {
          return true;
        }
        return {
          pointAtCenter: true,
        };
      }, [arrow]);
    

      const content = (
        <div>
          <button className='profile_button' onClick={()=>navigate("information")}>个人信息</button>
        </div>
      );

      const handleOk = () => {
        setNickName(inputValue)
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
                             <Popover content={walletAddress} >
                                    <span className='header_address'>{walletAddress}</span>

                            </Popover>

                            <Popover placement="bottom"  content={content} trigger="hover">
                                    <Avatar  style={{
                                        backgroundColor: '#fde3cf',
                                        color: '#f56a00',
                                        width: 50,
                                    }} className='custom-avatar'>
                                    {nickName}
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
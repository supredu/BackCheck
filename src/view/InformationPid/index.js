import React, { useEffect, useState } from 'react';
import './index.css'; // Import the CSS file
import { useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getJoobById } from '../../assets/job/jobSeek';



const InformationPid = () => {
  const location = useLocation();
  const { jobSeekId } = useParams(); 
  const JobSeekInfo = getJoobById(jobSeekId)
  console.log(`informationId ${jobSeekId} ${JobSeekInfo.name}`)

  const [isDiscordConnected, setIsDiscordConnected] = useState(false);
  const [isXConnected, setIsXdConnected] = useState(false);
  const address = localStorage.getItem(`address`);
  const newAddress = useSelector(state=>state.address);

  const isLogg = useSelector(state=>state.isLoggedIn);
  const certificates = JobSeekInfo.certification 
  const [certs, setCerts] = useState(certificates);

  const handleCheckboxClick = (id) => {
    setCerts(certs.map(cert => cert.id === id ? { ...cert, hidden: !cert.hidden } : cert));
  };



  useEffect(() => {
    console.log(`newAddress: ${newAddress}: ${address}`)
    const queryParams = new URLSearchParams(location.search);
    console.log(`路径参数 ${queryParams}`)
    const isDiscordConnectedParam = queryParams.get('discordconnected');
    const isXConnectedParam = queryParams.get('xconnected')
    console.log(`接受的参数 ${isDiscordConnectedParam} ${isXConnectedParam} ${address}`)
    if (address) {
      if (isDiscordConnectedParam === 'true') {
        setIsDiscordConnected(true);
        localStorage.setItem(`${address}_isDiscordConnected`, 'true');
      } else if (isDiscordConnectedParam === 'false') {
        setIsDiscordConnected(false);
        localStorage.setItem(`${address}_isDiscordConnected`, 'false');
      } else {
        const storedDiscordStatus = localStorage.getItem(`${address}_isDiscordConnected`);
        setIsDiscordConnected(storedDiscordStatus === 'true');
      }
      if (isXConnectedParam === 'true') {
        setIsXdConnected(true);
        localStorage.setItem(`${address}_isXConnected`, 'true');
      } else if (isXConnectedParam === 'false') {
        setIsXdConnected(false);
        localStorage.setItem(`${address}_isXConnected`, 'false');
      } else {
        const storedXStatus = localStorage.getItem(`${address}_isXConnected`);
        setIsXdConnected(storedXStatus === 'true');
      }
      console.log(`${isDiscordConnected}: ${isXConnected}`)
    }
}, [location,newAddress]);

  const handleDiscordClick=()=>{
    if(isLogg){
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1262664736181452922&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A1500%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+guilds+gdm.join+email+connections+guilds.join';

    }
   
    // window.location.href = 'https://discord.com/oauth2/authorize?client_id=1262664736181452922&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A1500%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+guilds+gdm.join+email+connections+guilds.join';

  }
  const handleXConnectClick=()=>{
    if(isLogg){
      window.location.href = 'http://localhost:1500/api/auth/x';
    }
   
  }

  return (
    <div className="information-container">
      <h2>My Certificate</h2>
      <div className="certificate-list">
      {certs.map(cert => (
        <div key={cert.id} className={`certificate-item`}>
          <img src={cert.img} alt="Certificate" className="certificate-image" />
          <span className="certificate-time">{cert.name}</span>
        </div>
      ))}
      </div>
      <hr className="divider" />
      <h2>Social Media</h2>
      <div className="social-media">
        <div className="social-media-item">
          <img src={assets.X} className='social_logo'/> 
          <span className='font-litle'>: </span>
          <button className="connect-font">{JobSeekInfo.Xsocial}</button>
        
        </div>
        <div className="social-media-item">
            <img src={assets.discord} className='social_logo'/> 
            <span className='font-litle'>: </span>
            <button className="connect-font">{JobSeekInfo.Disocial}</button>
           
        </div>
      </div>
    </div>
  );
};

export default InformationPid;

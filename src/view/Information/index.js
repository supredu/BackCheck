import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import { assets } from '../../assets/assets';
import { Tooltip } from 'antd';
const certificates = [
  { id: 1, img: `${assets.avatar}`, time: '2023-01-01', hidden: false },
  { id: 2, img: `${assets.avatar}`, time: '2023-02-01', hidden: false },
  { id: 3, img: `${assets.avatar}`, time: '2023-03-01', hidden: false },
  { id: 4, img: `${assets.avatar}`, time: '2023-03-01', hidden: false },
  { id: 5, img: `${assets.avatar}`, time: '2023-03-01', hidden: false },
];

const Information = () => {
  const [certs, setCerts] = useState(certificates);

  const handleCheckboxClick = (id) => {
    setCerts(certs.map(cert => cert.id === id ? { ...cert, hidden: !cert.hidden } : cert));
  };

  return (
    <div className="information-container">
      <h2>My Certificate</h2>
      <div className="certificate-list">
        {certs.map(cert => !cert.hidden && (
          <div key={cert.id} className="certificate-item" >
            <img src={cert.img} alt="Certificate" className="certificate-image" />
            <span className="certificate-time">{cert.time}</span>
            <Tooltip title="点击隐藏">
                <input type="checkbox" className="certificate-checkbox"             onClick={() => handleCheckboxClick(cert.id)}            />
            </Tooltip>
            
          </div>
        ))}
      </div>
      <hr className="divider" />
      <h2>Social Media</h2>
      <div className="social-media">
        <div className="social-media-item">
          <img src={assets.X} className='social_logo'/>
          <button className="connect-button">Connect</button>
        </div>
        <div className="social-media-item">
            <img src={assets.discord} className='social_logo'/>
          <button className="connect-button">Connect</button>
        </div>
        <div className="social-media-item">
            <img src={assets.Mail} className='social_logo'/>
          <button className="verify-button">Verify</button>
        </div>
      </div>
    </div>
  );
};

export default Information;

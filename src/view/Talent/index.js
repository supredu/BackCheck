import React from 'react';
import {useNavigate } from 'react-router-dom';

import { Avatar } from 'antd';
import { assets } from '../../assets/assets';
import './index.css'; // Import the CSS file
import { getAlJoobSeek } from '../../assets/job/jobSeek';
// const generateJobSeekers = (count) => {
//     const jobSeekers = [];
//     for (let i = 1; i <= count; i++) {
//       jobSeekers.push({ id: i, name: `Job Seeker ${i}`, avatar: `${assets.avatar}` });
//     }
//     return jobSeekers;
//   };
  
const jobSeekers = getAlJoobSeek()


const Talent = () => {
  const navigate = useNavigate();
 function getDetailInfo(seeker){
  console.log(`seeker ${seeker.id}`)
    navigate(`jobseeker/${seeker.id}`)
  }
  return (
    <div className="talent-container">
      {jobSeekers.map(seeker => (
        
        <button key={seeker.id} className="talent-item" onClick={()=>getDetailInfo(seeker)}>
          <Avatar size={100} src={seeker.avatar} />
          <div className="talent-name">{seeker.name}</div>
        </button>
      ))}
    </div>
  );
};

export default Talent;

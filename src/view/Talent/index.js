import React from 'react';
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
  return (
    <div className="talent-container">
      {jobSeekers.map(seeker => (
        
        <div key={seeker.id} className="talent-item">
          <Avatar size={100} src={seeker.avatar} />
          <div className="talent-name">{seeker.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Talent;

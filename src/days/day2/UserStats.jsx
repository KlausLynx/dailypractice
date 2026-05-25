import React from "react";
import './Exercises.css';
import UserPic from  '../../assets/c86a7ae8dd74930feb01715833b9ab84.jpg';

function UserStats() {
  const stats = {
    username: "React Master",
    posts: 342,
    followers: 1250,
    following: 180,
    joinDate: "Jan 2023",
    verified: true
  };

    return (
      <div className="user-stats" style={{background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)'}}>

        <div style={{display: "flex", alignItems: 'center', gap: '1rem',minWidth: '100%' }}>
            <img style={{marginLeft: '0px', width: '90px', height: '90px', borderRadius: '50%' }} src={UserPic} alt="User Avatar" className="avatar" />
            <div> 
              <p>{stats.username}</p>
              <p>Joined {stats.joinDate}</p>
            </div>
            <div style={{marginLeft: '2rem'}}>
                {stats.verified && <span className="verified-badge" style={{}}>✔️</span>}
            </div>
        </div>

        <div className="card-body">
          <h2 style={{fontWeight: "bolder", marginBottom: '1rem'}}>Statistics</h2>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
            <div className="stats-data">
              <p>Posts</p>
              <p>{stats.posts}</p>
            </div>

            <div className="stats-data">
              <p>Followers</p>
              <p style={{color: 'green'}}>{stats.followers}</p>
            </div>

            <div className="stats-data">
              <p>Following</p>
              <p>{stats.following}</p>
            </div>
          </div>
        </div>
      </div>
  );
}
export default UserStats;
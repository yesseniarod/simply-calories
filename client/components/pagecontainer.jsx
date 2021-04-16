import React from 'react';

export default function PageContainer(props) {
  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Simply Calories</h1>
        </div>
        <div className="top-navigation">
          <h3 className="nav-links"><a href="#home" className="nav">Home</a></h3>
          <h3 className="nav-links"><a href="#profile" className="nav">Profile</a></h3>
          <h3 className="nav-links"><a href= "#food-journal-entries"className="nav">Progress</a></h3>
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
      <div className="footer">
      <div className="bottom-nav">
          <a href="#food-journal-entries"><i className="fas fa-chart-bar chart-icon"> </i></a>
          <a href="#home"><i className="far fa-calendar calendar-icon"></i></a>
          <a href="#profile"><i className="fas fa-user-circle profile-icon"></i></a>
      </div>
      </div>
    </>
  );
}

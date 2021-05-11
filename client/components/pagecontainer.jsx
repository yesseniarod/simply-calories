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
          <h3 className="nav-links"><a href= "#food-journal"className="nav">Food</a></h3>
          <h3 className="nav-links"><a href="#workout-journal" className="nav">Activity</a></h3>
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
      <div className="footer">
      <div className="bottom-nav">
          <a href="#home"><i className="far fa-calendar calendar-icon"></i></a>
          <a href="#food-journal"><i className="fas fa-utensils nav-food"></i></a>
          <a href="#workout-journal"><i className="fas fa-dumbbell nav-workout"></i></a>
      </div>
      </div>
    </>
  );
}

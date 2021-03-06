import React from 'react';

export default function PageContainer(props) {
  return (
    <>
      <div className="header">
        <div className="title">
          <h1><a className="title-redirect"href="#home">Simply Calories</a></h1>
        </div>
          <ul className="top-navigation">
            <li className="navigation">
              <h2 className="nav-links"><a href="#home" className="nav">Home</a></h2>
            </li>
            <li className="navigation">
              <h2 className="nav-links"><a href="#food-journal" className="nav">Food</a></h2>
            </li>
            <li className="navigation">
              <h2 className="nav-links"><a href="#workout-journal" className="nav">Activity</a></h2>
            </li>
          </ul>
      </div>
      <div className="content">
        {props.children}
      </div>
      <div className="footer">
      <ul className="bottom-nav">
        <li className="navigation">
            <a href="#home" aria-label="navigate home"><i className="far fa-calendar calendar-icon"></i></a>
            <p className="icon-label">Home</p>
        </li>
        <li className="navigation">
            <a href="#food-journal" aria-label="navigate food-journal"><i className="fas fa-utensils nav-food"></i></a>
            <p className="icon-label">Food</p>
        </li>
        <li className="navigation">
          <a href="#workout-journal" aria-label="navigate workout-journal"><i className="fas fa-dumbbell nav-workout"></i></a>
          <p className="icon-label">Activity</p>
          </li>
      </ul>
      </div>
    </>
  );
}

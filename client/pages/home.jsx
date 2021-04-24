import React from 'react';
import LoginForm from '../components/login-form';

export default function Home(props) {
  return (
    <>

    <div className="content">
      <div className="introduction">
        <h2>Welcome to Simply Calories!</h2>
        {/* <p>We know counting calories can be difficult, </p>
        <p>we&apos;re here to make it simple</p> */}
        <LoginForm />
      </div>
      {/* <div className="next-container">
        <div className="next-page">
          <a href="#profile"><i className="fas fa-arrow-right"></i></a>
          </div>
      </div> */}
    </div>

    </>
  );
}

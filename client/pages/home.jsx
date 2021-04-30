import React from 'react';
import LoginForm from '../components/login-form';

export default function Home(props) {
  return (
    <>

    <div className="content">
      <div className="introduction">
        <h2>Welcome to Simply Calories!</h2>
        <LoginForm />
      </div>
    </div>

    </>
  );
}

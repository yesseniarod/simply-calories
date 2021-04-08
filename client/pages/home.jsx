import React from 'react';
import UserForm from '../components/form';

export default function Home(props) {
  return (
    <>
    <div className="header">
    <div className="title">
      <h1>Simply Calories</h1>
    </div>
    </div>
    <div className="content">
    <UserForm />
    </div>
    <div className="footer">

    </div>
    </>
  );
}

import React from 'react';
// import UserForm from '../components/form';
import SummaryTable from '../components/table';

export default function Home(props) {
  return (
    <>
    <div className="header">
    <div className="title">
      <h1>Simply Calories</h1>
    </div>
    </div>
    <div className="content">
    {/* <UserForm /> */}
    <SummaryTable />
    </div>
    <div className="footer">

    </div>
    </>
  );
}

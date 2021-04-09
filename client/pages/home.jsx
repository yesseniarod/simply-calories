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
    <SummaryTable age={27} gender={'female'} height={52} goalWeight={140} activityLevel={'lightly active'} />
    </div>
    <div className="footer">

    </div>
    </>
  );
}

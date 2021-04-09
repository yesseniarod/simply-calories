import React from 'react';

export default function PageContainer(props) {
  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Simply Calories</h1>
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
      <div className="footer">

      </div>
    </>
  );
}

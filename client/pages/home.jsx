import React from 'react';
import LoginForm from '../components/login-form';
import parseRoute from '../lib/parse-route';

export default class Home extends React.Component {

  render() {
    const route = parseRoute(window.location.hash);
    return (
      <>

        <div className="introduction">
          <h2>Welcome to Simply Calories!</h2>
          <LoginForm
            key={route.path}
            action={route.path}
          />
        </div>

      </>
    );
  }
}

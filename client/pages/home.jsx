import React from 'react';
import LoginForm from '../components/login-form';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';
import SummaryTable from '../components/table';

export default class Home extends React.Component {

  render() {
    const { handleSignIn, user } = this.context;
    const route = parseRoute(window.location.hash);

    if (user) {
      return <SummaryTable />;
    }
    return (
      <>

          <LoginForm
            key={route.path}
            action={route.path}
            onSignIn={handleSignIn}
          />

      </>
    );
  }
}

Home.contextType = AppContext;

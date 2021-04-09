import React from 'react';
import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  setUser(user) {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        this.setState({
          users: data
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return <Home />;
  }
}

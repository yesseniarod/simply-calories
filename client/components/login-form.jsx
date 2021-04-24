import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="login-container">
        <form>
          <div className="login">
          <label>Log In</label>
          </div>
          <div className="user">
            <label className="username-label">Username</label>
            <input
            required
            autoFocus
            name="username"/>
        </div>
        <div className="password">
          <label className="password-label">Password</label>
          <input
          required
          name="password"/>
        </div>
        <div className="register">
          <div>
          <a className="register-link">Register now</a>
          </div>
          <div className="login-button-container">
          <button className="login-button">Log In</button>
          </div>
        </div>

        </form>
      </div>
    );
  }
}

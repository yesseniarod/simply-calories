import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('Submitted!');
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <div className="login">
          <label>Log In</label>
          </div>
          <div className="user">
            <label className="username-label">Username</label>
            <input
            required
            autoFocus
            name="username"
            onChange={this.handleChange}/>
        </div>
        <div className="password">
          <label className="password-label">Password</label>
          <input
          required
          name="password"
          type="password"
          onChange={this.handleChange}/>
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

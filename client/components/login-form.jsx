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
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/credentials', req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        }
      });
  }

  render() {
    const { action } = this.props;
    const alternateHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';

    const alternateAction = action === 'sign-up'
      ? 'Sign in'
      : 'Register now';

    const buttonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';

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
          <a className="register-link" href={alternateHref}>
            {alternateAction}
          </a>
          </div>
          <div className="login-button-container">
          <button className="login-button">
            {buttonText}
          </button>
          </div>
        </div>

        </form>
      </div>
    );
  }
}

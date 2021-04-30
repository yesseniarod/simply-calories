import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isRegistered: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeText = this.changeText.bind(this);
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

  changeText(event) {
    const status = this.state.isRegistered;
    const toggle = { isRegistered: !status };
    this.setState({
      isRegistered: toggle.isRegistered
    });
  }

  componentDidMount() {
    const topNavigation = document.querySelector('.top-navigation');
    topNavigation.classList.add('hide');

    const bottomNavigation = document.querySelector('.bottom-nav');
    bottomNavigation.classList.add('hide');

  }

  render() {
    const current = this.state.isRegistered;
    const alternateText = current === false
      ? 'Sign Up'
      : 'Log In';
    const alternateLink = current === false
      ? 'Sign In'
      : 'Register';
    const alternateButton = current === false
      ? 'Register'
      : 'Log In';

    return (
        <div className="login-container">
          <form onSubmit={this.handleSubmit}>
            <div className="login">
              <label>
                {alternateText}
              </label>
            </div>
            <div className="user">
              <label className="username-label">Username</label>
              <input
                required
                name="username"
                onChange={this.handleChange} />
            </div>
            <div className="password">
              <label className="password-label">Password</label>
              <input
                required
                name="password"
                type="password"
                onChange={this.handleChange}
                minLength ="6"/>
            </div>
            <div className="register">
              <div>
                <a className="register-link" href={'#'} onClick={this.changeText}>
                  {alternateLink}
                </a>
              </div>
              <div className="login-button-container">
                <button className="login-button">
                  {alternateButton}
                </button>
              </div>
            </div>

          </form>
        </div>
    );
  }
}

// figure out how to change text when user clicks register/sign in
// text that needs to be changed is sign up, register, and sign in

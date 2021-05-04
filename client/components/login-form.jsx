import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      existingAccount: false
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
    fetch(`/api/credentials/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result === 23505) {
          this.setState({
            existingAccount: true
          });
        } else {
          if (action === 'sign-up') {
            window.location.hash = 'sign-in';
          } else if (result.user && result.token) {
            this.props.onSignIn(result);
          }
        }
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  handleError() {

    return (
        <div className='error'>
          <div>
          <span className='error-message'>Incorrect username or password</span>
          </div>
        </div>
    );
  }

  handleExisting() {
    return (
      <div className='error'>
        <div>
          <span className='error-message'>Username unavailable, try again!</span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const topNavigation = document.querySelector('.top-navigation');
    topNavigation.classList.add('hide');

    const bottomNavigation = document.querySelector('.bottom-nav');
    bottomNavigation.classList.add('hide');

  }

  render() {
    const { action } = this.props;
    const alternateText = action === 'sign-in'
      ? 'Log In'
      : 'Sign Up';
    const alternateLink = action === 'sign-in'
      ? 'Register'
      : 'Sign In';
    const alternateButton = action === 'sign-in'
      ? 'Log In'
      : 'Register';
    const alternateHref = action === 'sign-in'
      ? '#sign-up'
      : '#sign-in';

    return (
        <div className="login-container">
          <form onSubmit={this.handleSubmit}>
            {(this.state.error) && this.handleError()}
            {(this.state.existingAccount) && this.handleExisting()}
            <div className="login">
              <label className="form-title">
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
                <a className="register-link" href={alternateHref}>
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

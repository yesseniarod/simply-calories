import React from 'react';
import PageContainer from './components/pagecontainer';
import UserForm from './components/form';
import SummaryTable from './components/table';
import parseRoute from './lib/parse-route';
import FoodJournal from './pages/food-journal';
import FoodEntries from './components/food-entries';
import WorkoutJournal from './pages/workout-journal';
import WorkoutEntries from './components/workout-entries';
import Home from './pages/home';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash),
      isAuthorizing: true
    };
    // this.setUser = this.setUser.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  // setUser(user) {
  //   this.setState({
  //     user: user
  //   });

  // }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route, user } = this.state;
    if (route.path === 'profile') {
      return <UserForm />;
    }
    if (route.path === 'home') {
      return <SummaryTable />;
    }
    if (route.path === 'food-journal') {
      return <FoodJournal />;
    }
    if (route.path === 'food-journal-entries') {
      return <FoodEntries />;
    }
    if (route.path === 'workout-journal') {
      return <WorkoutJournal />;
    }
    if (route.path === 'workout-journal-entries') {
      return <WorkoutEntries />;
    }

    if (route.path === '' || route.path === 'sign-in' || route.path === 'sign-up' || user === null) {
      return <Home />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };

    return (
    <AppContext.Provider value={contextValue}>
    <>
    <PageContainer>
            <div className="sign-out">
              {user !== null &&
                <button className="sign-out-button" onClick={handleSignOut}>
                  Sign out&nbsp;
          <i className="fas fa-sign-out-alt"></i>
                </button>
              }
            </div>
      {this.renderPage()}
    </PageContainer>
    </>
    </AppContext.Provider>
    );
  }
}

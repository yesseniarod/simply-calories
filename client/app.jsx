import React from 'react';
import PageContainer from './components/pagecontainer';
import UserForm from './components/form';
import SummaryTable from './components/table';
import parseRoute from './lib/parse-route';
import FoodJournal from './pages/food-journal';
import FoodEntries from './components/food-entries';
import WorkoutJournal from './pages/workout-journal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
    this.setUser = this.setUser.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user
    });

  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <UserForm setUser={this.setUser}/>;
    }
    if (route.path === 'summary') {
      return <SummaryTable {...this.state.user}/>;
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
  }

  render() {

    return <PageContainer>
      {this.renderPage()}
    </PageContainer>;
  }
}

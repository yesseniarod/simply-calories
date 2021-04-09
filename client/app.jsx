import React from 'react';
// import Home from './pages/home';
import PageContainer from './components/pagecontainer';
import UserForm from './components/form';
import SummaryTable from './components/table';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user
    });

  }

  render() {
    return <PageContainer>
      <UserForm setUser={this.setUser}/>,
      <SummaryTable {...this.state.user}/>
    </PageContainer>;
  }
}

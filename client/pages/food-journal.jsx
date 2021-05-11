import React from 'react';
import SearchFood from '../components/searchBar';
import AppContext from '../lib/app-context';
import Home from '../pages/home';

export default class FoodJournal extends React.Component {

  render() {
    const { user } = this.context;

    if (user === null) {
      return <Home />;
    }

    return (
    <>
    <div className= "entry-heading">
      <h2 className="food-journal-title">Food journal</h2>
        <h3><a href="#food-journal-entries" className="view">View Entries</a></h3>
      </div>
      <SearchFood />

    </>
    );
  }
}

FoodJournal.contextType = AppContext;

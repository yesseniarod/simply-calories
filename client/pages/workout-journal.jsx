import React from 'react';
import SearchExercise from '../components/search-exercise';
import AppContext from '../lib/app-context';
import Home from '../pages/home';

export default class WorkoutJournal extends React.Component {

  render() {
    const { user } = this.context;

    if (user === null) {
      return <Home />;
    }

    return (
    <>
    <div className="entry-heading">
      <h2 className="workout-title">Workout journal</h2>
      <h3><a href="#workout-journal-entries" className="view">View Entries</a></h3>
    </div>
    <SearchExercise />
    </>
    );
  }
}

WorkoutJournal.contextType = AppContext;

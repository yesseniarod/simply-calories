import React from 'react';
import SearchExercise from '../components/search-exercise';

export default function WorkoutJournal(props) {
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

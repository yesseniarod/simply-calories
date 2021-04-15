import React from 'react';
import SearchFood from '../components/searchBar';

export default function FoodJournal(props) {
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

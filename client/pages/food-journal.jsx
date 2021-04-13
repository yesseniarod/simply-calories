import React from 'react';
import SearchFood from '../components/searchBar';
// import FoodList from '../components/food-list';

export default function FoodJournal(props) {
  return (
    <>
    <h2 className="food-journal-title">Food journal</h2>
      <SearchFood />
      {/* <FoodList /> */}

    </>
  );
}

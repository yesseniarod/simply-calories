import React from 'react';

export default function FoodJournal(props) {
  return (
    <>
    <h2>Food journal</h2>
    <form className="search">
      <div className="searchbar">
      <input type="search" placeholder="food search"/>
        <button className="search-button">
            <i className="fas fa-search"></i>
        </button>
        </div>
    </form>

    </>
  );
}

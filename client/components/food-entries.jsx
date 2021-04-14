import React from 'react';
// import SearchFood from './searchBar';

class FoodEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries() {
    fetch('/api/food-journal')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <>
        <h2 className="food-journal-title">Food journal</h2>
      </>
    );
  }
}

export default FoodEntries;

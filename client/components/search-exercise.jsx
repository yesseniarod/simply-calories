import React from 'react';

class SearchExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      result: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(event) {
    const { value } = event.target;
    this.setState({
      inputValue: value
    });
  }

  handleSearch(event) {
    event.preventDefault();
    const content = JSON.stringify({
      query: this.state.inputValue
    });
    const req = {
      method: 'POST',
      headers: {
        'x-app-id': process.env.REACT_APP_API_ID,
        'x-app-key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json'
      },
      body: content
    };

    fetch('https://trackapi.nutritionix.com/v2/natural/exercise', req)
      .then(res => res.json())
      .then(input => {
        this.setState({
          result: this.state.result.concat(input.exercises)
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <>
        <form className="search" onSubmit={this.handleSearch}>
          <div className="searchbar">
            <input
            name="inputValue"
            type="search"
            placeholder="exercise + duration"
            onChange={this.handleInput} />
            <button className="search-button">
              <i className="fas fa-search search-icon"></i>
            </button>
          </div>
        </form>
        <div className="search-result-container">
          <ul className="search-results">
            <div className="result-list">
              {
                this.state.result.map(item => {
                  return <li key={item.tag_id} className="exercise-item">
                    <div className="exercise-description">
                      <p> {item.name[0].toUpperCase()}{item.name.slice(1)} </p>
                      <p> Duration: {item.duration_min} minutes</p>
                      <p>Calories: {item.nf_calories}</p>
                    </div>
                    <div className="add">
                      <button className="add-item">
                        <i className="fas fa-plus add-icon"></i>
                      </button>
                    </div>
                  </li>;
                })
              }
            </div>
          </ul>
        </div>
      </>
    );
  }
}

export default SearchExercise;

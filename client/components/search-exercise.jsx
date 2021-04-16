import React from 'react';

class SearchExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      result: [],
      items: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectExercise = this.selectExercise.bind(this);
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

  selectExercise(event) {
    const exercise = event.target.getAttribute('data-id');
    const duration = event.target.getAttribute('data-duration');
    const calories = event.target.getAttribute('data-calories');
    const newItem = {
      name: exercise,
      duration: duration,
      calories: calories
    };
    this.setState({
      items: newItem
    });
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
                      <p> {item.name[0].toUpperCase() + item.name.slice(1)} </p>
                      <p> Duration: {item.duration_min} minutes</p>
                      <p>Calories: {item.nf_calories.toFixed()}</p>
                    </div>
                    <div className="add">
                      <button className="add-item"
                       data-id={item.name[0].toUpperCase() + item.name.slice(1)}
                        data-duration={item.duration_min}
                        data-calories={item.nf_calories}
                        onClick={this.selectExercise}>
                        <i className="fas fa-plus add-icon"
                        data-id={item.name[0].toUpperCase() + item.name.slice(1)} data-duration={item.duration_min} data-calories={item.nf_calories}></i>
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

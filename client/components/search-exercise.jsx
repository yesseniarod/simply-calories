import React from 'react';
import AppContext from '../lib/app-context';
import Loading from '../components/loading';

class SearchExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      result: [],
      items: [],
      isAdded: false,
      isLoading: false
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
    this.setState({
      isLoading: true
    });
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
          isLoading: false,
          result: this.state.result.concat(input.exercises)
        });
      })
      .catch(error => console.error(error));
  }

  selectExercise(event) {
    const { user } = this.context;
    const exercise = event.target.getAttribute('data-id');
    const duration = event.target.getAttribute('data-duration');
    const calories = event.target.getAttribute('data-calories');
    const newItem = {
      userId: user.userId,
      name: exercise,
      duration: duration,
      calories: calories
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    };
    fetch('/api/workout-journal', req)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: this.state.items.concat(data),
          isAdded: true
        });
        this.timer = setTimeout(() => {
          this.setState({
            isAdded: false
          });
        }, 1000);
      })
      .catch(error => console.error(error));
  }

  addedItem() {
    return (
      <div className="added">
        <div className="message">
        <p className="saved">Added!</p>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  loadingItems() {
    const result = document.querySelector('.search-results');
    result.classList.add('done');
    return (
      <Loading />
    );
  }

  render() {
    return (
      <>
      {this.state.isAdded && this.addedItem()}
        <form className="search" onSubmit={this.handleSearch}>
          <div className="searchbar">
            <input
            required
            name="inputValue"
            type="search"
            placeholder="exercise + duration"
            onChange={this.handleInput} />
            <button className="search-button">
              <i className="fas fa-search search-icon"></i>
            </button>
          </div>
        </form>
        {this.state.isLoading && this.loadingItems()}
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
                        onClick={this.selectExercise} type="button">
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
SearchExercise.contextType = AppContext;

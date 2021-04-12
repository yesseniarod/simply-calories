import React from 'react';

class SearchFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
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
    fetch('https://trackapi.nutritionix.com/v2/search/instant?query=' + this.state.inputValue, {
      method: 'GET',
      headers: {
        'x-app-id': process.env.REACT_APP_API_ID,
        'x-app-key': process.env.REACT_APP_API_KEY
      }
    })
      .then(response => response.json())
      .then(input => this.state.inputValue)
      .catch(error => console.error(error));
  }

  render() {

    return (
        <form
          className="search"
          onSubmit={this.handleSearch}>
          <div className="searchbar">
            <input
              name="inputValue"
              type="search"
              placeholder="food search"
              onChange={this.handleInput} />
            <button className="search-button">
              <i className="fas fa-search food-search-icon"></i>
            </button>
          </div>
        </form>
    );
  }
}

export default SearchFood;

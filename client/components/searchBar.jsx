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
        'x-app-id': 'dd9e56ab',
        'x-app-key': '4da30138c0f96e06685a4cf9c173e61e'
      }
    })
      .then(response => response.json())
      // .then(input => console.log(input.branded))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <form
      className="search"
      onSubmit={this.handleSearch}>
        <div className="searchbar">
          <input
          type="search"
          placeholder="food search"
          onChange={this.handleInput}/>
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchFood;

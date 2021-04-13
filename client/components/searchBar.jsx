import React from 'react';

class SearchFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      result: [],
      items: [],
      calories: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectItem = this.selectItem.bind(this);
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
      .then(input => {
        this.setState({
          result: input.branded
        });
      })
      .catch(error => console.error(error));
  }

  selectItem(event) {
    const selected = event.target.getAttribute('data-id');
    const calories = event.target.getAttribute('data-calories');
    this.setState({
      items: this.state.items.concat(selected),
      calories: this.state.calories.concat(calories)
    });
  }

  render() {
    // const { result } = this.state;
    return (
      <>
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
        <div>
          <ul className="search-results">
            <div className="result-list">
            {this.state.result.map(item => {
              return <li key={item.nix_item_id} onClick={this.selectItem} data-id={item.food_name + ` ${item.nf_calories} calories`} data-calories={item.nf_calories}>
                <div className="result-image">
                  <img src={item.photo.thumb} />
                </div>
                <div className="description">
                  <p>{item.food_name}</p>
                  <p className="calories">Calories: {item.nf_calories.toFixed()}</p>
                  <p className="serving">Serving: {item.serving_qty.toFixed(1)}</p>
                </div>
              </li>;
            })}
            </div>
          </ul>
        </div>
      </>
    );
  }
}

export default SearchFood;

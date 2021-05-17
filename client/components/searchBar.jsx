import React from 'react';
import AppContext from '../lib/app-context';
import Loading from '../components/loading';

class SearchFood extends React.Component {
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
    this.setState({
      isLoading: true
    });
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
          isLoading: false,
          result: input.branded
        });
      })
      .catch(error => console.error(error));
  }

  selectItem(event) {
    const { user } = this.context;
    const selected = event.target.getAttribute('data-id');
    const calories = event.target.getAttribute('data-calories');
    const serving = event.target.getAttribute('data-serving');
    const image = event.target.getAttribute('data-image');
    const unit = event.target.getAttribute('data-unit');
    const newItem = {
      userId: user.userId,
      name: selected,
      calories: calories,
      serving: serving,
      image: image,
      unit: unit
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    };
    fetch('/api/food-journal', req)
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
        }, 2000);
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
        <form
          className="search"
          onSubmit={this.handleSearch}>
          <div className="searchbar">
            <input
            required
              name="inputValue"
              type="search"
              placeholder="food search"
              onChange={this.handleInput} />
            <button className="search-button" aria-label="search">
              <i className="fas fa-search search-icon"></i>
            </button>
          </div>
        </form>
        {this.state.isLoading && this.loadingItems()}
        <div className="search-result-container">
          <ul className="search-results">
            {this.state.result.map(item => {
              return <li key={item.nix_item_id}>
                <div className="result-image">
                  <img src={item.photo.thumb} />
                </div>
                <div className="description">
                  <p>{item.food_name}</p>
                  <p className="calories">Calories: {item.nf_calories.toFixed()}</p>
                  <p className="serving">Serving: {item.serving_qty.toFixed(1)} {item.serving_unit}</p>
                </div>
                <div className="add">
                  <button className="add-item" onClick={this.selectItem} data-id={item.food_name} data-calories={item.nf_calories} data-serving={item.serving_qty} data-image={item.photo.thumb} data-unit={item.serving_unit} type="button" aria-label="add-item">
                    <i className="fas fa-plus add-icon" data-id={item.food_name} data-calories={item.nf_calories} data-serving={item.serving_qty} data-image={item.photo.thumb} data-unit={item.serving_unit}></i>
                </button>
                </div>
              </li>;
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default SearchFood;
SearchFood.contextType = AppContext;

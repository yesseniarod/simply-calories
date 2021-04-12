import React from 'react';

class SearchFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const { value } = event.target;
    this.setState({
      inputValue: value
    });
  }

  render() {
    return (
      <form className="search">
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

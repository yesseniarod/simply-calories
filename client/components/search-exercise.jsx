import React from 'react';

class SearchExercise extends React.Component {
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
      <>
        <form className="search">
          <div className="searchbar">
            <input
            name="inputValue"
            type="search"
            placeholder="exercise + distance/duration"
            onChange={this.handleInput} />
            <button className="search-button">
              <i className="fas fa-search search-icon"></i>
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default SearchExercise;

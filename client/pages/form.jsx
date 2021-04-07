import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'Male/Female',
      age: 'how old are you?',
      height: 'height feet and inches',
      currentWeight: 'weight in pounds',
      goalWeight: 'weight in pounds',
      activity: 'lightly active'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      gender: event.target.value,
      age: event.target.value,
      height: event.target.value,
      currentWeight: event.target.value,
      goalWeight: event.target.value,
      activity: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
    <div className="form-container">
      <form>
        <label>Gender</label>
        <input
        required
        type="text"
        onChange={this.handleChange}
        value={this.state.gender}>
        </input>

        <label>Age</label>
        <input
        required
        type="number"
        onChange={this.handleChange}
        min="18"
        max="100"
        value={this.state.age}>
        </input>

        <label>Height</label>
        <input
        required
        type="text"
        onChange={this.handleChange}
        value={this.state.height}>
        </input>

        <label>Current Weight</label>
        <input
        required
        type="number"
        onChange={this.handleChange}
        min="100"
        value={this.state.currentWeight}>
        </input>

        <label>What is your activity level?</label>
        <select
        required
        onChange={this.handleChange}
        value={this.state.activity}>
        <option value="sedentary">Little or no exercise</option>
        <option value="lightly active">Light exercise 1-3 days/week</option>
        <option value="moderately active">Moderate exercise 3-5 days/week</option>
        <option value="very active">Hard exercise 6/7 days/week</option>
        </select>

        <label>Goal Weight</label>
        <input
        required
        type="number"
        min="100"
        onChange={this.handleChange}
        value={this.state.goalWeight}>
        </input>
        <button>Submit</button>
      </form>
    </div>
    );
  }

}

export default UserForm;

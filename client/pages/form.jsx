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
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
    <div className="form-container">
      <form onSubmit={this.handleSubmit}>
        <label>Gender</label>
        <input
        required
        type="text"
        onChange={this.handleChange}
        name="gender">
        </input>

        <label>Age</label>
        <input
        required
        type="number"
        onChange={this.handleChange}
        min="18"
        max="100"
        name="age">
        </input>

        <label>Height</label>
        <input
        required
        type="text"
        onChange={this.handleChange}
        name="height">
        </input>

        <label>Current Weight</label>
        <input
        required
        type="number"
        onChange={this.handleChange}
        min="100"
        name="currentWeight">
        </input>

        <label>What is your activity level?</label>
        <select
        required
        onChange={this.handleChange}
        name="activity">
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
        name="goalWeight">
        </input>
        <button>Submit</button>
      </form>
    </div>
    );
  }

}

export default UserForm;

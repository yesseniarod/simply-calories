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
        <div className="row">
          <div className="col-half">
        <label>Gender</label>
        <input
        required
        type="text"
        onChange={this.handleChange}
        name="gender"
        placeholder="Female/Male">

        </input>
        </div>

        <div className="col-half">
        <label>Age</label>
        <input
        required
        type="number"
        onChange={this.handleChange}
        min="18"
        max="100"
        name="age">
        </input>
        </div>
        </div>

        <div className="row">
        <div className="col-half">
        <label>Height</label>
        <input
        required
        type="text"
        onChange={this.handleChange}
        name="height"
        placeholder="Feet and inches">

        </input>
        </div>

        <div className="col-half">
        <label>Current Weight</label>
        <input
        required
        type="number"
        onChange={this.handleChange}
        min="100"
        name="currentWeight"
        placeholder="Pounds">
        </input>
        </div>
        </div>

        <div className="row">
         <div className="col-half">
          <label>Activity Level</label>
          <select
          required
          onChange={this.handleChange}
          name="activity">
          <option value="sedentary">Little or no exercise</option>
          <option value="lightly active">Light exercise 1-3 days/week</option>
          <option value="moderately active">Moderate exercise 3-5 days/week</option>
          <option value="very active">Hard exercise 6/7 days/week</option>
          </select>
            </div>

        <div className="col-half">
        <label>Goal Weight</label>
        <input
        required
        type="number"
        min="100"
        onChange={this.handleChange}
        name="goalWeight"
        placeholder="Pounds">
        </input>
        </div>

        </div>
        <div className="button-container">
        <div className="submit-button">
            <i className="fas fa-check"></i>
        </div>
        </div>
      </form>
    </div>
    );
  }

}

export default UserForm;

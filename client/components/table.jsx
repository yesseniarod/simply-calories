import React from 'react';
import calorieCalculator from '../lib/calorieCalculator';
import sumCalories from '../lib/sum';

class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      items: [],
      activity: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  getFoodEntries() {
    fetch('/api/food-journal')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(error => console.error(error));
  }

  getWorkoutEntries() {
    fetch('/api/workout-journal')
      .then(res => res.json())
      .then(data => {
        this.setState({
          activity: data
        });
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getFoodEntries();
    this.getWorkoutEntries();
  }

  getCalories() {
    let calories = calorieCalculator(this.props.gender, this.props.age, this.props.height, this.props.goalWeight, this.props.activityLevel);
    if (isNaN(calories)) {
      calories = 0;
    }
    return calories;
  }

  render() {

    const calories = this.getCalories();
    const consumed = sumCalories(this.state.items);
    const burned = sumCalories(this.state.activity);
    return (
      <>
        <h2 className="table-title">Today</h2>
        <table>
          <thead>
            <tr>
              <th colSpan="3">{(calories - consumed) + burned} calories remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-right">
                {consumed}
              <p>consumed</p>
              </td>
              <td className="border-right">
                {burned}
              <p>burned</p>
              </td>
              <td>
                {consumed - burned}
              <p>net</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-button-container">
          <button className="modal-button" onClick={this.openModal}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {this.state.modalOpen &&
          <>
            <div className="modal-container" onClick={this.closeModal}>
              <div className="modal">
                <div>
                  <a href="#food-journal"><i className="fas fa-utensils utensils-icon"></i></a>
                  <p><a href="#food-journal" className="redirect-food-journal">Food journal</a></p>
                </div>
                <div>
                <a href="#workout-journal"><i className="fas fa-dumbbell dumbbell-icon"></i></a>
                <p><a href="#workout-journal" className="redirect-workout-journal"> Workout journal</a></p>
                </div>
              </div>
            </div>
          </>
        }
      </>
    );

  }
}

export default SummaryTable;

import React from 'react';
import calorieCalculator from '../lib/calorieCalculator';
import sumCalories from '../lib/sum';
import AppContext from '../lib/app-context';
import Home from '../pages/home';
import LoginForm from '../components/login-form';

class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      items: [],
      activity: [],
      result: null,
      calories: null
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
    const { user } = this.context;
    const userId = user.userId;
    fetch(`/api/food-journal/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
        if (this.state.items.length === 0) {
          this.setState({
            items: []
          });
        }
      })
      .catch(error => console.error(error));
  }

  getWorkoutEntries() {
    const { user } = this.context;
    const userId = user.userId;
    fetch(`/api/workout-journal/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          activity: data
        });
        if (this.state.activity.length === 0) {
          this.setState({
            activity: []
          });
        }
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    const { user } = this.context;
    if (user === null) {
      return <LoginForm />;
    } else {
      this.getFoodEntries();
      this.getWorkoutEntries();
      this.getCalories();
    }
  }

  getCalories() {
    const { user } = this.context;
    if (!user) return null;
    const userId = user.userId;
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          result: data
        });
        let calories = calorieCalculator(this.state.result.gender, this.state.result.age, this.state.result.height, this.state.result.goalWeight, this.state.result.activityLevel);
        this.setState({
          calories
        });
        if (this.state.result === null) {
          calories = 0;
        }
        return calories;
      })
      .catch(error => console.error(error));
  }

  render() {

    const calories = this.state.calories;
    const consumed = sumCalories(this.state.items);
    const burned = sumCalories(this.state.activity);
    const { user } = this.context;

    if (user === null) {
      return <Home/>;
    }

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
SummaryTable.contextType = AppContext;

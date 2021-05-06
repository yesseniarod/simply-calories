import React from 'react';
import sumCalories from '../lib/sum';
import AppContext from '../lib/app-context';

class WorkoutEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: []
    };
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries() {
    const { user } = this.context;
    if (!user) return null;
    const userId = user.userId;
    fetch(`/api/workout-journal/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          activity: data
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const burned = sumCalories(this.state.activity);

    return (
      <>
      <div className="entry-heading">
        <h2 className="workout-title">Workout journal</h2>
        <h3>{burned} calories</h3>
      </div>
      <div className="search-result-container">
        <ul className="entries-list">
          <div className="result-list">
            {
              this.state.activity.map(item => {
                return <li key={item.workoutId}>
                  <div className="exercise-entry-description">
                    <p>{item.name}</p>
                    <p>Duration: {item.duration} minutes</p>
                    <p>Calories: {item.calories}</p>
                  </div>
                </li>;
              })
            }
          </div>
        </ul>
      </div>
      </>
    );
  }
}

export default WorkoutEntries;
WorkoutEntries.contextType = AppContext;

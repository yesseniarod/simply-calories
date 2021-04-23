import React from 'react';
import sumCalories from '../lib/sum';

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
    fetch('/api/workout-journal')
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

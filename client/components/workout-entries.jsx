import React from 'react';

class WorkoutEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
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
          items: data
        });
      })
      .catch(error => console.error(error));
  }

  sumCalories(items) {
    let total = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      total += this.state.items[i].calories;
    }
    return total;
  }

  render() {
    const burned = this.sumCalories(this.state.items);

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
              this.state.items.map(item => {
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

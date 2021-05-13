import React from 'react';
import sumCalories from '../lib/sum';
import AppContext from '../lib/app-context';
import Home from '../pages/home';

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

  // greeting() {
  //   return (
  //     <div className="greeting">
  //       <h3 className="greeting-message">Nothing has been added to your journal</h3>
  //     </div>
  //   );
  // }

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
        // if (this.state.activity.length === 0) {
        //   this.setState({
        //     activity: []
        //   });
        // }
      })
      .catch(error => console.error(error));
  }

  render() {
    const burned = sumCalories(this.state.activity);
    const { user } = this.context;
    // const empty = this.state.activity.length === 0;

    if (user === null) {
      return <Home/>;
    }

    return (
      <>
      <div className="entry-heading">
        <h2 className="workout-title">Workout journal</h2>
        <h3>{burned} calories</h3>
      </div>
      <div className="search-result-container">
        <ul className="entries-list">
          <div className="result-list">
            {/* {empty && this.greeting()} */}
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

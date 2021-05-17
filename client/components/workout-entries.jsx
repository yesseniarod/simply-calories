import React from 'react';
import sumCalories from '../lib/sum';
import AppContext from '../lib/app-context';
import Home from '../pages/home';
import Loading from '../components/loading';

class WorkoutEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      isEmpty: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const entries = document.querySelector('.entries-list');
    entries.classList.add('hide');
    this.getEntries();
    setTimeout(() => {
      entries.classList.remove('hide');
    }, 1500);
  }

  greeting() {
    return (
       <div className="greeting">
         <h3 className="greeting-message">Nothing has been added to your journal</h3>
       </div>
    );
  }

  getEntries() {
    const { user } = this.context;
    if (!user) return null;
    const userId = user.userId;
    fetch(`/api/workout-journal/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          activity: data
        });
        if (this.state.activity.length === 0) {
          this.setState({
            isEmpty: true
          });
        }
      })
      .catch(error => console.error(error));
  }

  loadingItems() {
    const entries = document.querySelector('.entries-list');
    entries.classList.add('done');
    return (
      <Loading />
    );
  }

  render() {
    const burned = sumCalories(this.state.activity);
    const { user } = this.context;

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
        {this.state.isLoading && this.loadingItems()}
          {this.state.isEmpty && this.greeting()}
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

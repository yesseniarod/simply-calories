import React from 'react';

class WorkoutEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
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

  render() {
    return (
      <>
      <div className="entry-heading">
        <h2 className="workout-title">Workout journal</h2>
      </div>
      </>
    );
  }
}

export default WorkoutEntries;

import React from 'react';

class WorkoutEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
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

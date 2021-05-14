import React from 'react';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner loading-spinner"></i>
      </div>
    );
  }
}

import React from 'react';
import calorieCalculator from '../lib/calorieCalculator';

class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({
      modalOpen: true
    });
  }

  render() {
    const calories = calorieCalculator(this.props.gender, this.props.age, this.props.height, this.props.goalWeight, this.props.activityLevel);
    if (this.state.modalOpen) {
      return (
        <>
          <h2 className="table-title">Today</h2>
          <table>
            <thead>
              <tr>
                <th colSpan="3">{calories} calories remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-right">
                  0
              <p>consumed</p>
                </td>
                <td className="border-right">
                  0
              <p>burned</p>
                </td>
                <td>
                  0
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
          <div className="modal-container">
            <div className="modal">
              <div>
              <i className="fas fa-utensils"></i>
              <p>Food journal</p>
              </div>
              <div>
              <i className="fas fa-dumbbell"></i>
              <p>Workout journal</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2 className="table-title">Today</h2>
          <table>
            <thead>
              <tr>
                <th colSpan="3">{calories} calories remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-right">
                  0
              <p>consumed</p>
                </td>
                <td className="border-right">
                  0
              <p>burned</p>
                </td>
                <td>
                  0
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
        </>
      );
    }
  }
}

export default SummaryTable;

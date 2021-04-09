import React from 'react';
import calorieCalculator from '../lib/calorieCalculator';

class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChanged: false
    };
  }

  render() {
    const calories = calorieCalculator(this.props.gender, this.props.age, this.props.height, this.props.goalWeight, this.props.activityLevel);
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
      </>
    );
  }
}

export default SummaryTable;

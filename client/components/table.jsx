import React from 'react';

class SummaryTable extends React.Component {
  render() {
    return (
      <>
      <h2 className="table-title">Today</h2>
        <table>
          <thead>
            <tr>
              <th colSpan="3">2000 calories remaining</th>
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

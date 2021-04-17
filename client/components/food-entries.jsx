import React from 'react';
import sumCalories from '../lib/sum';

class FoodEntries extends React.Component {
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
    fetch('/api/food-journal')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const consumed = sumCalories(this.state.items);
    return (
       <>
       <div className="entry-heading">
         <h2 className="food-journal-title">Food journal</h2>
          <h3>{consumed} calories</h3>
        </div>
         <div className="food-entries-container">
           <ul className="food-entries-list">
             <div className="entries">
               {
                 this.state.items.map(item => {
                   return <li key={item.foodId}>
                     <div className="result-image">
                       <img src={item.image} />
                     </div>
                     <div className="description">
                       <p>{item.name}</p>
                       <p>Calories: {item.calories}</p>
                       <p>Serving: {item.serving} {item.unit}</p>
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

export default FoodEntries;

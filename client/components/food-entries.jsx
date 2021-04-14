import React from 'react';
// import SearchFood from './searchBar';

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
    return (
       <>
         <h2 className="food-journal-title">Food journal</h2>
         <div className="food-entries-container">
           <ul className="food-entries-list">
             <div className="entries">
               {
                 this.state.items.map(item => {
                   return <li key={item.foodId}>
                     <div className="entry-details">
                       <p>{item.name}</p>
                       <p>Calories: {item.calories}</p>
                       <p>Serving: {item.serving}</p>
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

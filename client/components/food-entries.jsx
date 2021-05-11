import React from 'react';
import sumCalories from '../lib/sum';
import AppContext from '../lib/app-context';
import Home from '../pages/home';

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
    const { user } = this.context;

    if (!user) return null;
    const userId = user.userId;
    fetch(`/api/food-journal/${userId}`)
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

    const { user } = this.context;
    if (user === null) {
      return <Home />;
    }

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
FoodEntries.contextType = AppContext;

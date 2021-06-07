import React from 'react';
import sumCalories from '../lib/sum';
import AppContext from '../lib/app-context';
import Home from '../pages/home';
import Loading from '../components/loading';

class FoodEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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

  getEntries() {
    const { user } = this.context;

    if (!user) return null;
    const userId = user.userId;
    fetch(`/api/food-journal/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          items: data
        });

        if (this.state.items.length === 0) {
          this.setState({
            isEmpty: true
          });
        }
      })
      .catch(error => console.error(error));
  }

  greeting() {
    return (
        <div className="greeting">
         <h3 className="greeting-message">Nothing has been added to your journal</h3>
        </div>
    );
  }

  loadingItems() {
    const entries = document.querySelector('.entries-list');
    entries.classList.add('done');
    return (
      <Loading />
    );
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
         <h2 className="food-journal-title"><a className="redirect-entries" href="#food-journal">Food journal</a></h2>
          <h3>{consumed} calories</h3>
        </div>
        {this.state.isLoading && this.loadingItems()}
         <div className="food-entries-container">
           <ul className="entries-list">
             <div className="entries">
               {this.state.isEmpty && this.greeting()}
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

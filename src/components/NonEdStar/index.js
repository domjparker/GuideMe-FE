import React from 'react';
import ReactDOM from 'react-dom';
import FixedStarRatingComponent from 'react-star-rating-component';
 
class App extends React.Component {
  render() {
    const { rating } = this.state;
 
    return (                
      <div>
        <h2>Ratings: {rating}</h2>
        <FixedStarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <i class="fa fa-star"></i>}
          starCount={10}
          value={8}
        />
      </div>
    );
  }
}
 
ReactDOM.render(
  <App />, 
  document.getElementById('app')
);
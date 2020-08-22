import React from "react";
import StarRatingComponent from 'react-star-rating-component';

function StarRating() {

  constructor(); {
    super();

    this.state = {
      rating: 1
    };
  }
  onStarClick(nextValue, prevValue, name); {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h6>Rating: {rating}</h6>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}



export default StarRating

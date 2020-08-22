import React from "react";
// import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

class App extends React.Component {
    // static props = {
    //     name= {String},
    //     value={ Number },
    //     starCount={ Number },
    //     onStarClick= Function(nextValue, prevValue, name) ,
    //     onStarHover={ Function(nextValue, prevValue, name) {}},
    //     onStarHoverOut={ Function(nextValue, prevValue, name) {}},
    //     renderStarIcon={ Function(nextValue, prevValue, name) {}},
    //     renderStarIconHalf={ Function(nextValue, prevValue, name) {}},
    //     starColor={ String },
    //     emptyStarColor={ String },
    //     editing={ Boolean },
    // }

    constructor() {
        super();

        this.state = {
            rating: 1
        };
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
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

  
// ReactDOM.render(
//     <App />,
//     document.getElementById('star')
// );

export default App

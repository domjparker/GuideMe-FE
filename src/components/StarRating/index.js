// import React, { useState } from "react";
// import ReactDOM from 'react-dom';
// import StarRatingComponent from 'react-star-rating-component';
// import API from '../../util/API'
// import { Input, TextArea, FormBtn } from "../components/Form";



// function Star() {
//     constructor() {
//         super();

//         this.state = {
//             rating: 1
//         };
//     }

//     onStarClick(nextValue, prevValue, name) {
//         this.setState({ rating: nextValue });
//     }

//     render() {
//         const { rating } = this.state;

//         const [starObj, setStarObj] = useState({ firstName: '', lastName: '' })


//         const handleInputChange = event => {
//             // Getting the value and name of the input which triggered the change
//             let value = event.target.value;
//             const name = event.target.name;
//             // Updating the input's state
//             if (name === 'firstName') value = value.toLowerCase()
//             setStarObj({ ...starObj, [name]: value })
//         };
//         const handleFormSubmit = event => {
//             event.preventDefault();
//             API.postNewUser(starObj).then(res => console.log(res)).catch(err => console.log(err))
//             //reset form to empty
//             setStarObj({ firstName: '', lastName: '' })
//         };

//         return (
//             <div>
//                 <h2>Rate this Adventure: {rating}</h2>
//                 <StarRatingComponent
//                     name="rate1"
//                     starCount={5}
//                     value={rating}
//                     onStarClick={this.onStarClick.bind(this)}
//                 />
//                 <form className="star" onSubmit={handleFormSubmit}>
//                     <Input
//                         value={starObj.firstName}
//                         name="firstName"
//                         onChange={handleInputChange}
//                         type="text"
//                         placeholder="First Name"
//                         required
//                     />
//                     <Input
//                         value={starObj.lastName}
//                         name="lastName"
//                         onChange={handleInputChange}
//                         type="text"
//                         placeholder="Last Name"
//                         required
//                     />
//                     <TextArea
//                         onChange={handleInputChange}
//                         value={starObj.TextArea}
//                         name="comment"
//                         placeholder="Comment (Optional)"
//                     />
//                     <FormBtn children={'Submit'} />

//                 </form>
//             </div>
//         );
//     }
// }

// ReactDOM.render(
//     <Star />,
//     document.getElementById('star')
// );

// export default Star
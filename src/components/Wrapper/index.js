//generic building block, should only be used for pages
//holds the styling that pages don't run to the edges of screen on large screens
import React from "react";
import "./style.css";

function Wrapper(props) {
  return <main className="wrapper" {...props} />;
}

export default Wrapper;

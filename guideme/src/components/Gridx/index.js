//generic Foundation 'row' component
import React from "react";

function Gridx(props) {
  return <div className={`grid-x ${props.classes}`} {...props} />;
}

export default Gridx;

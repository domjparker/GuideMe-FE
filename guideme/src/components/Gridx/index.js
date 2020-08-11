import React from "react";

function Gridx(props) {
  return <div className={`grid-x${props.full ? " full" : ""}`} {...props} />;
}

export default Gridx;

import React from "react";

function Cell(props) {
  const size = props.size.split(" ").map(size => " " + size).join(" ");

  return <div className={"cell" + size} {...props} />;
}

export default Cell;

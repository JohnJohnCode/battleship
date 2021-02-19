import React from "react";
import * as classes from "./Announcer.module.css";

const Announcer = (props) => {
  let spanStyle;
  let divStyle;
  switch (props.text) {
    case "Victory":
      spanStyle = `${classes.Victory}`;
      divStyle = `${classes.TextCont} ${classes.Appear}`;
      break;
    case "Defeat":
      spanStyle = `${classes.Defeat}`;
      divStyle = `${classes.TextCont} ${classes.Appear}`;
      break;
    default:
      spanStyle = `${classes.Default}`;
      divStyle = `${classes.TextCont}`;
      break;
  }
  return (
    <div className={divStyle}>
      <span className={spanStyle}>
        {props.text === "Victory" ? "Victory" : "Defeat"}
      </span>
    </div>
  );
};

export default Announcer;

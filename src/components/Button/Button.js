import React from "react";
import * as classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.StartGame} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

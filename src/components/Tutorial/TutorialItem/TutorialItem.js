import React from "react";
import * as classes from "./TutorialItem.module.css";

const TutorialItem = (props) => {
  return <li className={classes.TutorialItem}>{props.children}</li>;
};

export default TutorialItem;

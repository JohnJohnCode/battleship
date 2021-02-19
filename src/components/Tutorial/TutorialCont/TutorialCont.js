import React from "react";
import TutorialItem from "../TutorialItem/TutorialItem";
import * as classes from "./TutorialCont.module.css";

const TutorialCont = (props) => {
  return (
    <div
      className={classes.TutorialCont}
      onClick={props.toggle}
      style={props.show ? { opacity: 1 } : { opacity: 0 }}
    >
      <ul className={classes.List}>
        <TutorialItem>
          {props.isStarted
            ? "Click on the computer's board to play"
            : "Drag and drop your battleships to place them"}
        </TutorialItem>
        <TutorialItem>
          {props.isStarted
            ? "Sink all computer's battleships to win"
            : "Click on your battleships to change their axis"}
        </TutorialItem>
        <TutorialItem>
          {props.isStarted
            ? "Click here to hide this"
            : "Press 'Start Game' to start playing"}
        </TutorialItem>
      </ul>
    </div>
  );
};

export default TutorialCont;

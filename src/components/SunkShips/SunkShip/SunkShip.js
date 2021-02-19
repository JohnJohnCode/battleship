import React from "react";
import * as classes from "./SunkShip.module.css";

const SunkShip = (props) => {
  let builtShip = [];
  for (let x = 0; x < props.length; x++) {
    builtShip.push(
      <span
        key={x}
        className={
          !props.isSunk
            ? classes.shipPart
            : `${classes.shipPart} ${classes.sunk}`
        }
      ></span>
    );
  }

  return <div className={classes.shipCont}>{builtShip}</div>;
};

export default SunkShip;

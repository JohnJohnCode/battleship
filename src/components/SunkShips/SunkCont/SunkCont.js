import React from "react";
import SunkShip from "../SunkShip/SunkShip";
import * as classes from "./SunkCont.module.css";

const SunkCont = (props) => {
  return (
    <div className={classes.SunkCont}>
      <SunkShip length={5} isSunk={props.sunkList.includes("5")} />
      <SunkShip length={4} isSunk={props.sunkList.includes("4")} />
      <SunkShip length={3} isSunk={props.sunkList.includes("3_2")} />
      <SunkShip length={3} isSunk={props.sunkList.includes("3_1")} />
      <SunkShip length={2} isSunk={props.sunkList.includes("2")} />
    </div>
  );
};

export default SunkCont;

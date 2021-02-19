import React from "react";
import classes from "./Ship.module.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../reactdnd/constants";

const Ship = (props) => {
  // react-dnd allow this component to be dragable
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.SHIP,
      name: props.ship.name,
      coords: props.coords[props.ship.name][2],
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !props.isStarted && !props.isOver,
  });
  let ship;
  let style = {
    height: `${
      props.coords[props.ship.name][2] === "x"
        ? "33px"
        : (props.ship.length * 32 + 1).toString() + "px"
    }`,
    width: `${
      props.coords[props.ship.name][2] === "x"
        ? (props.ship.length * 32 + 1).toString() + "px"
        : "33px"
    }`,
    top: `${(props.coords[props.ship.name][0] * 32).toString() + "px"}`,
    left: `${(props.coords[props.ship.name][1] * 32).toString() + "px"}`,
    opacity: `${isDragging ? "0" : "1"}`,
  };
  ship = (
    <div
      ref={drag}
      className={classes.Ship}
      style={style}
      onClick={
        !props.isStarted && !props.isOver
          ? () => props.changeOri(props.ship.name)
          : null
      }
    />
  );

  return ship;
};

export default Ship;

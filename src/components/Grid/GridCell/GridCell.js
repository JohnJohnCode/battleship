import React from "react";
import { ItemTypes } from "../../../reactdnd/constants";
import { useDrop } from "react-dnd";

const Cell = (props) => {
  // react-dnd drop target
  const [{ ship }, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: () => {
      props.placeShips(
        ship.name,
        parseInt(props.id.charAt(0)),
        parseInt(props.id.charAt(1)),
        ship.coords
      );
      return undefined;
    },
    collect: (monitor) => ({
      ship: monitor.getItem(),
    }),
  });

  return (
    <div
      className={props.outerClass}
      id={props.id}
      onClick={props.onClick}
      ref={drop}
    >
      <span className={props.innerClass}>{props.children}</span>
    </div>
  );
};

export default Cell;

import React, { useEffect } from "react";
import Ship from "../../Ship/Ship";
import GridCell from "../GridCell/GridCell";
import * as classes from "./PlayerGrid.module.css";

const Grid = (props) => {
  useEffect(() => {
    props.randomPlaceShips(
      props.ship2,
      props.ship3_1,
      props.ship3_2,
      props.ship4,
      props.ship5
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.randomPlaceShips(
      props.ship2,
      props.ship3_1,
      props.ship3_2,
      props.ship4,
      props.ship5
    );
    // eslint-disable-next-line
  }, [props.shouldPlace]);

  const playerGrid = props.board.map((row, index) => {
    return row.map((cell, i) => {
      if (props.board[index][i] === 0) {
        // cell is empty
        return (
          <GridCell
            outerClass={classes.Item}
            innerClass={classes.CellText}
            key={index.toString() + i.toString()}
            id={index.toString() + i.toString()}
            placeShips={props.placeShips}
          />
        );
      } else if (props.board[index][i] === 2) {
        // cell is a hit
        return (
          <GridCell
            outerClass={`${classes.Item} ${classes.Hit}`}
            innerClass={classes.CellText}
            key={index.toString() + i.toString()}
            id={index.toString() + i.toString()}
            placeShips={props.placeShips}
          />
        );
      } else if (props.board[index][i] === 3) {
        // cell is a miss
        return (
          <GridCell
            outerClass={`${classes.Item} ${classes.Miss}`}
            innerClass={classes.CellText}
            key={index.toString() + i.toString()}
            id={index.toString() + i.toString()}
            placeShips={props.placeShips}
          >
            •
          </GridCell>
        );
      } else {
        // cell is a ship
        return (
          <GridCell
            outerClass={classes.Item}
            innerClass={classes.CellText}
            key={index.toString() + i.toString()}
            id={index.toString() + i.toString()}
            placeShips={props.placeShips}
          />
        );
      }
    });
  });

  return (
    <div className={classes.Container}>
      <React.Fragment>
        {playerGrid}
        <Ship
          coords={props.coords}
          ship={props.ship2}
          isStarted={props.isStarted}
          isOver={props.isOver}
          changeOri={props.changeOri}
        />
        <Ship
          coords={props.coords}
          ship={props.ship3_1}
          isStarted={props.isStarted}
          isOver={props.isOver}
          changeOri={props.changeOri}
        />
        <Ship
          coords={props.coords}
          ship={props.ship3_2}
          isStarted={props.isStarted}
          isOver={props.isOver}
          changeOri={props.changeOri}
        />
        <Ship
          coords={props.coords}
          ship={props.ship4}
          isStarted={props.isStarted}
          isOver={props.isOver}
          changeOri={props.changeOri}
        />
        <Ship
          coords={props.coords}
          ship={props.ship5}
          isStarted={props.isStarted}
          isOver={props.isOver}
          changeOri={props.changeOri}
        />
      </React.Fragment>
    </div>
  );
};

export default Grid;

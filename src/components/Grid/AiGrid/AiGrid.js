import React, { useEffect } from "react";
import GridCell from "../GridCell/GridCell";
import * as classes from "./AiGrid.module.css";

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

  const newGrid = props.board.map((row, index) => {
    return row.map((cell, i) => {
      // cell is empty
      if (props.board[index][i] === 0) {
        return (
          <GridCell
            outerClass={
              props.isStarted && !props.gameIsOver
                ? `${classes.Item} ${classes.Hover}`
                : classes.Item
            }
            innerClass={classes.CellText}
            key={"AI" + index.toString() + i.toString()}
            id={"AI" + index.toString() + i.toString()}
            onClick={(e) =>
              props.playRound(e, "AI" + index.toString() + i.toString())
            }
          />
        );
        // cell is a hit
      } else if (props.board[index][i] === 2) {
        return (
          <GridCell
            outerClass={`${classes.Item} ${classes.Hit}`}
            innerClass={classes.CellText}
            key={"AI" + index.toString() + i.toString()}
            id={"AI" + index.toString() + i.toString()}
          />
        );
        // cell is a miss
      } else if (props.board[index][i] === 3) {
        return (
          <GridCell
            outerClass={`${classes.Item} ${classes.Miss}`}
            innerClass={classes.CellText}
            key={"AI" + index.toString() + i.toString()}
            id={"AI" + index.toString() + i.toString()}
          >
            •
          </GridCell>
        );
        // cell contains a ship
      } else {
        return (
          <GridCell
            outerClass={
              props.isStarted && !props.gameIsOver
                ? `${classes.Item} ${classes.Hover}`
                : classes.Item
            }
            innerClass={classes.CellText}
            key={"AI" + index.toString() + i.toString()}
            id={"AI" + index.toString() + i.toString()}
            onClick={(e) =>
              props.playRound(e, "AI" + index.toString() + i.toString())
            }
          />
        );
      }
    });
  });

  return <div className={classes.Container}>{newGrid}</div>;
};

export default Grid;

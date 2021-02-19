import React, { useState, useEffect } from "react";

import createGameboard from "../../factories/gameboardFactory/gameboardFactory";
import createShip from "../../factories/shipFactory/shipFactory";
import PlayerGrid from "../../components/Grid/PlayerGrid/PlayerGrid";
import AiGrid from "../../components/Grid/AiGrid/AiGrid";
import Button from "../../components/Button/Button";
import classes from "./Game.module.css";
import Header from "../../components/Header/Header";
import Announcer from "../../components/Announcer/Announcer";
import TutorialCont from "../../components/Tutorial/TutorialCont/TutorialCont";
import SunkCont from "../../components/SunkShips/SunkCont/SunkCont";

const Game = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [shouldPlace, setShouldPlace] = useState(false);
  const [text, setText] = useState("TBD");
  const [show, setShow] = useState(true);
  const [sunkList, setSunkList] = useState([]);

  const initialShip = createShip();

  const [Pship2, setPship2] = useState(initialShip.getInitialShip("2"));
  const [Pship3_1, setPship3_1] = useState(initialShip.getInitialShip("3_1"));
  const [Pship3_2, setPship3_2] = useState(initialShip.getInitialShip("3_2"));
  const [Pship4, setPship4] = useState(initialShip.getInitialShip("4"));
  const [Pship5, setPship5] = useState(initialShip.getInitialShip("5"));

  const [AIship2, setAIship2] = useState(initialShip.getInitialShip("2"));
  const [AIship3_1, setAIship3_1] = useState(initialShip.getInitialShip("3_1"));
  const [AIship3_2, setAIship3_2] = useState(initialShip.getInitialShip("3_2"));
  const [AIship4, setAIship4] = useState(initialShip.getInitialShip("4"));
  const [AIship5, setAIship5] = useState(initialShip.getInitialShip("5"));

  const initialBoard = createGameboard();

  const [playerBoard, setPlayerBoard] = useState(initialBoard.getInitialBoard);
  const [playerCoords, setPlayerCoords] = useState(
    initialBoard.getInitialCoords
  );
  const [playerData, setPlayerData] = useState(initialBoard.getInitialData);

  const [aiBoard, setAIboard] = useState(initialBoard.getInitialBoard);
  const [aiCoords, setAIcoords] = useState(initialBoard.getInitialCoords);
  const [aiData, setAIdata] = useState(initialBoard.getInitialData);

  const [firstHit, setFirstHit] = useState(null);
  const [foundShips, setFoundShips] = useState([]);
  const [hitCoords, setHitCoords] = useState(null);
  const [adjDir, setAdjDir] = useState(null);

  const startGame = () => {
    setIsStarted(true);
  };

  const toggle = () => {
    setShow(!show);
  };

  const resetGame = () => {
    setPship2(initialShip.getInitialShip("2"));
    setPship3_1(initialShip.getInitialShip("3_1"));
    setPship3_2(initialShip.getInitialShip("3_2"));
    setPship4(initialShip.getInitialShip("4"));
    setPship5(initialShip.getInitialShip("5"));
    setAIship2(initialShip.getInitialShip("2"));
    setAIship3_1(initialShip.getInitialShip("3_1"));
    setAIship3_2(initialShip.getInitialShip("3_2"));
    setAIship4(initialShip.getInitialShip("4"));
    setAIship5(initialShip.getInitialShip("5"));
    setPlayerBoard(initialBoard.getInitialBoard);
    setPlayerCoords(initialBoard.getInitialCoords);
    setPlayerData(initialBoard.getInitialData);
    setAIboard(initialBoard.getInitialBoard);
    setAIcoords(initialBoard.getInitialCoords);
    setAIdata(initialBoard.getInitialData);
    setFirstHit(null);
    setFoundShips([]);
    setHitCoords(null);
    setAdjDir(null);
    setIsStarted(false);
    setGameIsOver(false);
    setPlayerTurn(true);
    setShouldPlace(!shouldPlace);
    setText("TBD");
    setShow(true);
    setSunkList([]);
  };

  const playerBoardPlaceShipsHandler = (ship1, ship2, ship3, ship4, ship5) => {
    let newState = initialBoard.randomPlaceShip(
      playerBoard,
      playerCoords,
      playerData,
      "2"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "3_1"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "3_2"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "4"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "5"
    );
    setPlayerBoard(newState[0]);
    setPlayerCoords(newState[1]);
    setPlayerData(newState[2]);
  };

  const placeShips = (ship, x, y, orientation) => {
    // handles placing ships by drag and dropping
    let newPlacement = initialBoard.placeShip(
      playerBoard,
      playerCoords,
      playerData,
      ship,
      x,
      y,
      orientation
    );
    if (newPlacement) {
      setPlayerBoard(newPlacement[0]);
      setPlayerCoords(newPlacement[1]);
      setPlayerData(newPlacement[2]);
      return true;
    } else return false;
  };

  const aiBoardPlaceShipsHandler = (ship1, ship2, ship3, ship4, ship5) => {
    // places AI's ships randomly
    let newState = initialBoard.randomPlaceShip(aiBoard, aiCoords, aiData, "2");
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "3_1"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "3_2"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "4"
    );
    newState = initialBoard.randomPlaceShip(
      newState[0],
      newState[1],
      newState[2],
      "5"
    );
    setAIboard(newState[0]);
    setAIcoords(newState[1]);
    setAIdata(newState[2]);
  };

  const getAdjCoords = (x, y) => {
    // checks a cell's surrounding cells and collects valid ones (no hit/miss);
    let adjCoords = [];
    if (
      x + 1 < 10 &&
      playerBoard[x + 1][y] !== 2 &&
      playerBoard[x + 1][y] !== 3
    )
      adjCoords.push([x + 1, y, "down"]);
    if (
      x - 1 >= 0 &&
      playerBoard[x - 1][y] !== 2 &&
      playerBoard[x - 1][y] !== 3
    )
      adjCoords.push([x - 1, y, "up"]);
    if (
      y + 1 < 10 &&
      playerBoard[x][y + 1] !== 2 &&
      playerBoard[x][y + 1] !== 3
    )
      adjCoords.push([x, y + 1, "right"]);
    if (
      y - 1 >= 0 &&
      playerBoard[x][y - 1] !== 2 &&
      playerBoard[x][y - 1] !== 3
    )
      adjCoords.push([x, y - 1, "left"]);
    return adjCoords;
  };

  const checkIsSunk = (shipAt) => {
    // checks if a ship is sunk upon being hit
    let sunk;
    let newShip;
    switch (shipAt) {
      case "2":
        newShip = initialShip.hit(Pship2);
        sunk = initialShip.isSunk(newShip);
        setPship2(newShip);
        return sunk;
      case "3_1":
        newShip = initialShip.hit(Pship3_1);
        sunk = initialShip.isSunk(newShip);
        setPship3_1(newShip);
        return sunk;
      case "3_2":
        newShip = initialShip.hit(Pship3_2);
        sunk = initialShip.isSunk(newShip);
        setPship3_2(newShip);
        return sunk;
      case "4":
        newShip = initialShip.hit(Pship4);
        sunk = initialShip.isSunk(newShip);
        setPship4(newShip);
        return sunk;
      case "5":
        newShip = initialShip.hit(Pship5);
        sunk = initialShip.isSunk(newShip);
        setPship5(newShip);
        return sunk;
      default:
        return false;
    }
  };

  const changeOri = (ship) => {
    // changes a ship's axis (e.g. from "x" to "y")
    let newPlacement = initialBoard.changeOrientation(
      playerBoard,
      playerCoords,
      ship
    );
    if (newPlacement) {
      setPlayerBoard(newPlacement[0]);
      setPlayerCoords(newPlacement[1]);
      return true;
    } else return false;
  };

  const switchDir = () => {
    switch (adjDir) {
      case "down":
        setAdjDir("up");
        break;
      case "up":
        setAdjDir("down");
        break;
      case "right":
        setAdjDir("left");
        break;
      case "left":
        setAdjDir("right");
        break;
      default:
        return false;
    }
  };

  const aiPlayRound = (board, boardData) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    let newData = JSON.parse(JSON.stringify(boardData));
    // if no ship was previously hit
    if (firstHit === null && foundShips.length === 0) {
      let aiTurn = initialBoard.receiveRandomAttack(newBoard, newData);
      // AI's turn hit a ship, check which ship it hit and if it sunk
      if (playerBoard[aiTurn[0]][aiTurn[1]] === 1) {
        let shipAt = initialBoard.shipAt(playerCoords, aiTurn[0], aiTurn[1]);
        let sunk = checkIsSunk(shipAt);
        if (!sunk) setFirstHit([aiTurn[0], aiTurn[1], shipAt]);
      }
      setPlayerBoard(aiTurn[2]);
      setPlayerData(aiTurn[3]);
      setPlayerTurn(true);
      // checks if the game is over
      if (initialBoard.isOverCheck(aiTurn[3])) {
        setText("Defeat");
        setGameIsOver(true);
        setPlayerTurn(false);
      }
    } else {
      // if a ship was hit but AI doesn't know which way is the rest of the ship
      if (adjDir === null) {
        // get adjacent cells and try shooting them one by one until a ship is hit
        let adjCoordsArgs = [firstHit[0], firstHit[1]];
        let adjCells = getAdjCoords(adjCoordsArgs[0], adjCoordsArgs[1]);
        let randomAdj = adjCells[Math.floor(Math.random() * adjCells.length)];
        let randomTurn = initialBoard.receiveAttack(
          newBoard,
          newData,
          randomAdj[0],
          randomAdj[1]
        );
        setPlayerBoard(randomTurn[0]);
        setPlayerData(randomTurn[1]);
        setPlayerTurn(true);
        // if a ship was hit, check if the game is over, what ship got hit and if it sunk
        if (randomTurn[0][randomAdj[0]][randomAdj[1]] === 2) {
          if (initialBoard.isOverCheck(randomTurn[1])) {
            setText("Defeat");
            setGameIsOver(true);
            setPlayerTurn(false);
          }
          let shipAt = initialBoard.shipAt(
            playerCoords,
            randomAdj[0],
            randomAdj[1]
          );
          let sunk = checkIsSunk(shipAt);
          // check if the hit ship is the same as the first hit ship, if it isnt, add it as the next target
          if (shipAt === firstHit[2]) {
            // if the ship wasn't sunk, save the direction and keep shooting until it's sunk or missed
            if (!sunk) {
              setAdjDir(randomAdj[2]);
              setHitCoords([randomAdj[0], randomAdj[1]]);
            } else {
              if (foundShips.length > 0) {
                setFirstHit([...foundShips[0]]);
                setHitCoords(null);
                setAdjDir(null);
                setFoundShips(foundShips.slice(1));
              } else {
                setFirstHit(null);
                setHitCoords(null);
                setAdjDir(null);
              }
            }
          } else {
            // add the ship as the next target (if the hit isn't the same ship as the first one)
            let newFoundShips = JSON.parse(JSON.stringify(foundShips));
            newFoundShips.push([randomAdj[0], randomAdj[1], shipAt]);
            setFoundShips(newFoundShips);
          }
        }
      } else {
        // we have a direction so shoot until you miss / sink a ship
        let nextMove;
        let safeMove;
        let newHitCoord = [...hitCoords];
        switch (adjDir) {
          case "down":
            nextMove = [newHitCoord[0] + 1, newHitCoord[1]];
            safeMove = [firstHit[0] - 1, firstHit[1]];
            break;
          case "up":
            nextMove = [newHitCoord[0] - 1, newHitCoord[1]];
            safeMove = [firstHit[0] + 1, firstHit[1]];
            break;
          case "right":
            nextMove = [newHitCoord[0], newHitCoord[1] + 1];
            safeMove = [firstHit[0], firstHit[1] - 1];
            break;
          case "left":
            nextMove = [newHitCoord[0], newHitCoord[1] - 1];
            safeMove = [firstHit[0], firstHit[1] + 1];
            break;
          default:
            return false;
        }
        if (
          nextMove[0] === 10 ||
          nextMove[0] === -1 ||
          nextMove[1] === 10 ||
          nextMove[1] === -1
        ) {
          // if the next move is off board, play a safe move and switch direction
          nextMove = [...safeMove];
          switchDir();
        }
        // again check if we hit, sunk etc. If sunk, search for a new target or shoot randomly
        if (playerBoard[nextMove[0]][nextMove[1]] === 1) {
          let shipAt = initialBoard.shipAt(
            playerCoords,
            nextMove[0],
            nextMove[1]
          );
          let sunk = checkIsSunk(shipAt);
          let aiTurn = initialBoard.receiveAttack(
            newBoard,
            newData,
            nextMove[0],
            nextMove[1]
          );
          setPlayerBoard(aiTurn[0]);
          setPlayerData(aiTurn[1]);
          setPlayerTurn(true);
          if (initialBoard.isOverCheck(aiTurn[1])) {
            setText("Defeat");
            setGameIsOver(true);
            setPlayerTurn(false);
          }
          if (!sunk) {
            setHitCoords([nextMove[0], nextMove[1]]);
          } else {
            if (foundShips.length > 0) {
              setFirstHit([...foundShips[0]]);
              setHitCoords(null);
              setAdjDir(null);
              setFoundShips(foundShips.slice(1));
            } else {
              setFirstHit(null);
              setHitCoords(null);
              setAdjDir(null);
            }
          }
        } else {
          let newHitCoords = [...firstHit];
          setHitCoords(newHitCoords);
          switchDir();
          if (
            playerBoard[nextMove[0]][nextMove[1]] === 2 ||
            playerBoard[nextMove[0]][nextMove[1]] === 3
          ) {
            nextMove = [...safeMove];
            if (playerBoard[nextMove[0]][nextMove[1]] === 1) {
              let safeShipAt = initialBoard.shipAt(
                playerCoords,
                nextMove[0],
                nextMove[1]
              );
              let safeIsSunk = checkIsSunk(safeShipAt);
              if (safeIsSunk) {
                setHitCoords(null);
                setFirstHit(null);
                setAdjDir(null);
              }
            }
          }
          const [newPboard, newPdata] = initialBoard.receiveAttack(
            newBoard,
            newData,
            nextMove[0],
            nextMove[1]
          );
          setPlayerBoard(newPboard);
          setPlayerData(newPdata);
          setPlayerTurn(true);
          if (initialBoard.isOverCheck(newPdata)) {
            setText("Defeat");
            setGameIsOver(true);
            setPlayerTurn(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!playerTurn && !gameIsOver) {
      setTimeout(() => aiPlayRound(playerBoard, playerData), 1100);
    }
    // eslint-disable-next-line
  }, [playerTurn]);

  const playRound = (event, id) => {
    if (!isStarted || !playerTurn) {
      return false;
    } else {
      const x = id.charAt(2);
      const y = id.charAt(3);
      setPlayerTurn(false);
      if (aiBoard[x][y] === 0) {
        const [newAiBoard, newAiData] = initialBoard.receiveAttack(
          aiBoard,
          aiData,
          x,
          y
        );
        setAIboard(newAiBoard);
        setAIdata(newAiData);
      } else if (aiBoard[x][y] === 1) {
        const [newAiBoard, newAiData] = initialBoard.receiveAttack(
          aiBoard,
          aiData,
          x,
          y
        );
        setAIboard(newAiBoard);
        setAIdata(newAiData);
        let shipAt = initialBoard.shipAt(aiCoords, x, y);
        let newShip;
        let sunk;
        switch (shipAt) {
          case "2":
            newShip = initialShip.hit(AIship2);
            sunk = initialShip.isSunk(newShip);
            if (sunk) {
              let newSunkList = [...sunkList];
              newSunkList.push("2");
              setSunkList(newSunkList);
            }
            setAIship2(newShip);
            break;
          case "3_1":
            newShip = initialShip.hit(AIship3_1);
            sunk = initialShip.isSunk(newShip);
            if (sunk) {
              let newSunkList = [...sunkList];
              newSunkList.push("3_1");
              setSunkList(newSunkList);
            }
            setAIship3_1(newShip);
            break;
          case "3_2":
            newShip = initialShip.hit(AIship3_2);
            sunk = initialShip.isSunk(newShip);
            if (sunk) {
              let newSunkList = [...sunkList];
              newSunkList.push("3_2");
              setSunkList(newSunkList);
            }
            setAIship3_2(newShip);
            break;
          case "4":
            newShip = initialShip.hit(AIship4);
            sunk = initialShip.isSunk(newShip);
            if (sunk) {
              let newSunkList = [...sunkList];
              newSunkList.push("4");
              setSunkList(newSunkList);
            }
            setAIship4(newShip);
            break;
          case "5":
            newShip = initialShip.hit(AIship5);
            sunk = initialShip.isSunk(newShip);
            if (sunk) {
              let newSunkList = [...sunkList];
              newSunkList.push("5");
              setSunkList(newSunkList);
            }
            setAIship5(newShip);
            break;
          default:
            return false;
        }
        if (initialBoard.isOverCheck(newAiData)) {
          setText("Victory");
          setGameIsOver(true);
          setPlayerTurn(false);
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <Announcer gameIsOver={gameIsOver} text={text} />
      <TutorialCont isStarted={isStarted} toggle={toggle} show={show} />
      <SunkCont sunkList={sunkList} />
      <div className={classes.GridCont}>
        <div className={classes.PlayerGrid}>
          <PlayerGrid
            testid="playerGrid"
            shouldPlace={shouldPlace}
            isStarted={isStarted}
            board={playerBoard}
            coords={playerCoords}
            randomPlaceShips={playerBoardPlaceShipsHandler}
            placeShips={placeShips}
            ship2={Pship2}
            ship3_1={Pship3_1}
            ship3_2={Pship3_2}
            ship4={Pship4}
            ship5={Pship5}
            isOver={gameIsOver}
            changeOri={changeOri}
          />
        </div>
        <AiGrid
          testid="aiGrid"
          shouldPlace={shouldPlace}
          playRound={playRound}
          randomPlaceShips={aiBoardPlaceShipsHandler}
          isStarted={isStarted}
          isOver={gameIsOver}
          board={aiBoard}
          coords={aiCoords}
          ship2={AIship2}
          ship3_1={AIship3_1}
          ship3_2={AIship3_2}
          ship4={AIship4}
          ship5={AIship5}
        />
      </div>
      <Button onClick={isStarted ? resetGame : startGame}>
        {isStarted ? "Restart Game" : "Start Game"}
      </Button>
    </div>
  );
};

export default Game;

const createGameboard = () => {
  const getInitialBoard = () => {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  };

  const getInitialData = () => {
    return {
      totalHP: 0,
    };
  };

  const getInitialCoords = () => {
    return {
      2: [],
      "3_1": [],
      "3_2": [],
      4: [],
      5: [],
    };
  };

  const isOverCheck = (boardData) => {
    if (boardData.totalHP === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkX = (board, x, y, z) => {
    // checks if there's space on X axis
    if (y + z - 1 > 9) {
      return false;
    } else {
      for (let i = 0; i < z; i++) {
        if (board[x][y + i] === 0) {
          if (i === z - 1) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  };

  const checkY = (board, x, y, z) => {
    // checks if there's space on Y axis
    if (x + z - 1 > 9) {
      return false;
    } else {
      for (let i = 0; i < z; i++) {
        if (board[x + i][y] === 0) {
          if (i === z - 1) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  };

  const changeOrientation = (board, coords, ship) => {
    // change orientation from x to y and vice versa if possible
    let newOri = coords[ship][2] === "x" ? "y" : "x";
    if (
      newOri === "x" &&
      checkX(
        board,
        coords[ship][0],
        coords[ship][1] + 1,
        parseInt(ship.charAt(0)) - 1
      )
    ) {
      let newCoords = JSON.parse(JSON.stringify(coords));
      let newBoard = JSON.parse(JSON.stringify(board));
      for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
        newBoard[coords[ship][0] + z][coords[ship][1]] = 0;
      }
      for (let i = 0; i < parseInt(ship.charAt(0)); i++) {
        newBoard[coords[ship][0]][coords[ship][1] + i] = 1;
      }
      newCoords[ship] = [coords[ship][0], coords[ship][1], newOri];
      return [newBoard, newCoords];
    } else if (
      newOri === "y" &&
      checkY(
        board,
        coords[ship][0] + 1,
        coords[ship][1],
        parseInt(ship.charAt(0)) - 1
      )
    ) {
      let newCoords = JSON.parse(JSON.stringify(coords));
      let newBoard = JSON.parse(JSON.stringify(board));
      for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
        newBoard[coords[ship][0]][coords[ship][1] + z] = 0;
      }
      for (let i = 0; i < parseInt(ship.charAt(0)); i++) {
        newBoard[coords[ship][0] + i][coords[ship][1]] = 1;
      }
      newCoords[ship] = [coords[ship][0], coords[ship][1], newOri];
      return [newBoard, newCoords];
    } else {
      return false;
    }
  };

  const placeShip = (board, coords, boardData, ship, x, y, orientation) => {
    if (orientation === "x" && checkX(board, x, y, parseInt(ship.charAt(0)))) {
      let newData = JSON.parse(JSON.stringify(boardData));
      let newCoords = JSON.parse(JSON.stringify(coords));
      let newBoard = JSON.parse(JSON.stringify(board));
      if (coords[ship].length !== 0) {
        if (coords[ship][2] === "x") {
          for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
            newBoard[coords[ship][0]][coords[ship][1] + z] = 0;
          }
        } else {
          for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
            newBoard[coords[ship][0] + z][coords[ship][1]] = 0;
          }
        }
        newData.totalHP -= parseInt(ship.charAt(0));
      }
      for (let i = 0; i < parseInt(ship.charAt(0)); i++) {
        newBoard[x][y + i] = 1;
      }
      newData.totalHP += parseInt(ship.charAt(0));
      newCoords[ship] = [x, y, orientation];
      return [newBoard, newCoords, newData];
    } else if (
      orientation === "y" &&
      checkY(board, x, y, parseInt(ship.charAt(0)))
    ) {
      let newData = JSON.parse(JSON.stringify(boardData));
      let newCoords = JSON.parse(JSON.stringify(coords));
      let newBoard = JSON.parse(JSON.stringify(board));
      if (coords[ship].length !== 0) {
        if (coords[ship][2] === "x") {
          for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
            newBoard[coords[ship][0]][coords[ship][1] + z] = 0;
          }
        } else {
          for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
            newBoard[coords[ship][0] + z][coords[ship][1]] = 0;
          }
        }
        newData.totalHP -= parseInt(ship.charAt(0));
      }
      for (let i = 0; i < parseInt(ship.charAt(0)); i++) {
        newBoard[x + i][y] = 1;
      }
      newData.totalHP += parseInt(ship.charAt(0));
      newCoords[ship] = [x, y, orientation];
      return [newBoard, newCoords, newData];
    } else {
      return false;
    }
  };

  const randomPlaceShip = (board, coords, boardData, ship) => {
    let x;
    let y;
    let orientation;
    while (true) {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        Math.floor(Math.random() * 2) === 0
          ? (orientation = "x")
          : (orientation = "y");
      } while (board[x][y] !== 0);
      let correctPS = placeShip(
        board,
        coords,
        boardData,
        ship,
        x,
        y,
        orientation
      );
      if (correctPS) {
        return correctPS;
      }
    }
  };

  const receiveAttack = (board, boardData, x, y) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    let newData = JSON.parse(JSON.stringify(boardData));
    switch (board[x][y]) {
      case 0:
        newBoard[x][y] = 3;
        return [newBoard, newData];
      case 1:
        newBoard[x][y] = 2;
        newData.totalHP -= 1;
        return [newBoard, newData];
      default:
        return false;
    }
  };

  const receiveRandomAttack = (board, boardData) => {
    let played = false;
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      if (board[x][y] === 0 || board[x][y] === 1) {
        played = true;
      }
    } while (played === false);
    return [x, y, ...receiveAttack(board, boardData, x, y)];
  };

  const shipAt = (coords, x, y) => {
    // checks what ship got hit
    for (let ship in coords) {
      if (coords[ship][0] === parseInt(x)) {
        if (coords[ship][2] === "x") {
          for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
            if (coords[ship][1] + z === parseInt(y)) {
              return ship;
            }
          }
        } else {
          if (coords[ship][1] === parseInt(y)) {
            for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
              if (coords[ship][0] + z === parseInt(x)) {
                return ship;
              }
            }
          }
        }
      } else if (coords[ship][1] === parseInt(y)) {
        if (coords[ship][2] === "y") {
          for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
            if (coords[ship][0] + z === parseInt(x)) {
              return ship;
            }
          }
        } else {
          if (coords[ship][0] === parseInt(x)) {
            for (let z = 0; z < parseInt(ship.charAt(0)); z++) {
              if (coords[ship][1] + z === parseInt(y)) {
                return ship;
              }
            }
          }
        }
      }
    }
  };

  return {
    placeShip,
    receiveAttack,
    isOverCheck,
    randomPlaceShip,
    receiveRandomAttack,
    shipAt,
    getInitialBoard,
    getInitialData,
    getInitialCoords,
    changeOrientation,
  };
};

export default createGameboard;

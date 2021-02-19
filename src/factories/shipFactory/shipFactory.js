const createShip = (name) => {
  let ships = {
    2: {
      length: 2,
      hp: 2,
      isSunk: false,
    },
    "3_1": {
      length: 3,
      hp: 3,
      isSunk: false,
    },
    "3_2": {
      length: 3,
      hp: 3,
      isSunk: false,
    },
    4: {
      length: 4,
      hp: 4,
      isSunk: false,
    },
    5: {
      length: 5,
      hp: 5,
      isSunk: false,
    },
  };

  const getInitialShip = (name) => {
    return {
      name: name,
      length: ships[name].length,
      hp: ships[name].hp,
      isSunk: false,
    };
  };

  const hit = (ship) => {
    let newShip = JSON.parse(JSON.stringify(ship));
    newShip.hp -= 1;
    return newShip;
  };

  const isSunk = (ship) => {
    if (ship.hp === 0) {
      ship.isSunk = true;
      return true;
    } else {
      return false;
    }
  };

  return {
    getInitialShip,
    hit,
    isSunk,
  };
};

export default createShip;

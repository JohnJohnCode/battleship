import React from "react";

import * as classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.HeaderCont}>
      <span className={classes.Title}>Battleship</span>
    </div>
  );
};

export default Header;

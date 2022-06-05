import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import AppBar from "@mui/material/AppBar";
import React from "react";

const HeaderMenu = ({styles}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Gamer-Tag.xyz</Typography>
        <div className={styles.grow}/>
        <ConnectButton chainStatus="icon"
                       showBalance={false}/>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenu;
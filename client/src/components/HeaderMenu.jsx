import React from "react";
import {AppBar, Toolbar} from "@mui/material";
import {HeaderLink} from ".";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Header menu with navigation links
 * @param styles Styles object passed from App.jsx
 * @returns {JSX.Element}
 */
const HeaderMenu = ({styles}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="static" className={styles.headerBar}>
      <Toolbar>
        <div className={styles.grow}/>
        <HeaderLink to="/" text="#GamerTag" styles={styles}/>
        <div className={styles.grow}/>
        <HeaderLink to="/lookup" text="Lookup" styles={styles}/>
        <HeaderLink to="/about" text="About" styles={styles}/>
        <div className={isSmallScreen ? styles.hide : styles.spacing}/>
        <span className={isSmallScreen ? styles.hide : ""}>
          <ConnectButton chainStatus="icon" showBalance={false}/>
        </span>
        <div className={isSmallScreen ? styles.hide : styles.grow}/>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenu;
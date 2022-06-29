import Toolbar from "@mui/material/Toolbar";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "@mui/material/Link";

const HeaderMenu = ({styles}) => {
  let {pathname} = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  function getHeaderStyles(path){
    return pathname === path ? styles.headerLinkActive : styles.headerLink
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={styles.grow}/>
        <Link to="/" component={RouterLink} variant={isSmallScreen ? "h7" : "h6"} className={getHeaderStyles("/")}>#gamer-tag</Link>
        <div className={styles.grow}/>
        <Link to="/lookup" component={RouterLink} variant={isSmallScreen ? "h6" : "h6"} className={getHeaderStyles("/lookup")}>Lookup</Link>
        <Link to="/about" component={RouterLink} variant={isSmallScreen ? "h6" : "h6"} className={getHeaderStyles("/about")}>About</Link>
        <Link to="/developers" component={RouterLink} variant={isSmallScreen ? "h6" : "h6"} className={getHeaderStyles("/developers")}>Developers</Link>
        <span className={isSmallScreen ? styles.hide : ''}>
          <div className={styles.spacing}/>
          <ConnectButton chainStatus="icon" showBalance={false}/>
          <div className={styles.grow}/>
        </span>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenu;
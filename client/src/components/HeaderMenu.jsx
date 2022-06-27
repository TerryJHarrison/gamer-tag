import Toolbar from "@mui/material/Toolbar";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import Link from "@mui/material/Link";

const HeaderMenu = ({styles}) => {
  let {pathname} = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={styles.grow}/>
        <Link to="/" component={RouterLink} variant="h6" className={pathname === "/" ? styles.headerLinkActive : styles.headerLink}>#gamer-tag</Link>
        <div className={styles.grow}/>
        <Link to="/lookup" component={RouterLink} variant="h6" className={pathname === "/lookup" ? styles.headerLinkActive : styles.headerLink}>Lookup</Link>
        <Link to="/about" component={RouterLink} variant="h6" className={pathname === "/about" ? styles.headerLinkActive :  styles.headerLink}>About</Link>
        <Link to="/developers" component={RouterLink} variant="h6" className={pathname === "/developers" ? styles.headerLinkActive :  styles.headerLink}>Developers</Link>
        <div className={styles.spacing}/>
        <ConnectButton chainStatus="icon" showBalance={false}/>
        <div className={styles.grow}/>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenu;
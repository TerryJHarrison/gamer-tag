import Toolbar from "@mui/material/Toolbar";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "@mui/material/Link";

const HeaderMenu = ({styles}) => {
  let {pathname} = useLocation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  function getHeaderStyles(path){
    return pathname === path ? styles.headerLinkActive : styles.headerLink
  }

  return (
    <AppBar position="static" className={styles.headerBar}>
      <Toolbar>
        <div className={styles.grow}/>
        <Link to="/" component={RouterLink} variant={isSmallScreen ? "h6" : "h5"} className={getHeaderStyles("/")}>#GamerTag</Link>
        <div className={styles.grow}/>
        <Link to="/lookup" component={RouterLink} variant={isSmallScreen ? "h6" : "h5"} className={getHeaderStyles("/lookup")}>Lookup</Link>
        <Link to="/about" component={RouterLink} variant={isSmallScreen ? "h6" : "h5"} className={getHeaderStyles("/about")}>About</Link>
        {/*<Link to="/developers" component={RouterLink} variant={isSmallScreen ? "h6" : "h5"} className={getHeaderStyles("/developers")}>Developers</Link>*/}
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
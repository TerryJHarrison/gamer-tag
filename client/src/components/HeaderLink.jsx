import React from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Link} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Header link, detects if active page and displays different visuals
 * @param styles Styles object passed from App.jsx
 * @param to The URI path to navigate to
 * @param text The header text to display
 * @returns {JSX.Element}
 */
const HeaderLink = ({styles, to, text}) => {
  let {pathname} = useLocation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Link to={to}
          component={RouterLink}
          variant={isSmallScreen ? "h6" : "h5"}
          className={pathname === to ?
            styles.headerLinkActive :
            styles.headerLink}>
      {text}
    </Link>
  );
}

export default HeaderLink;
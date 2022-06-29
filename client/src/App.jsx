import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeaderMenu from "./components/HeaderMenu";
import ManageTag from "./pages/ManageTag";
import About from "./pages/About";
import { makeStyles } from '@mui/styles';
import Lookup from "./pages/Lookup";
import Developers from "./pages/Developers";

const App = () => {
  const useStyles = makeStyles({
    root: {
      backgroundColor: "#000"
    },
    nickname: {
      marginBottom: 4
    },
    spacing: {
      paddingLeft: 4,
      paddingRight: 4
    },
    grow: {
      flexGrow: 1
    },
    topPadded: {
      paddingTop: 10
    },
    topMargined: {
      marginTop: 30
    },
    headerLink: {
      color: "#fff !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 6,
      paddingRight: 6,
    },
    headerLinkActive: {
      color: "#1976d2 !important",
      backgroundColor: "#fff !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 6,
      paddingRight: 6,
      borderRadius: 5,
      textDecoration: "none !important"
    },
    hide: {
      display: "none"
    }
  });
  const styles = useStyles();

  return (
    <Box component="span">
      <HeaderMenu styles={styles}/>
      <Container className={styles.topPadded}>
        <Routes>
          <Route path="/" element={<ManageTag styles={styles}/>}/>
          <Route path="about" element={<About styles={styles}/>}/>
          <Route path="lookup" element={<Lookup styles={styles}/>}/>
          <Route path="developers" element={<Developers styles={styles}/>}/>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
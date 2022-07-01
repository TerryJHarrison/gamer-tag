import * as React from "react";
import {Routes, Route} from "react-router-dom";
import {Box, Container} from "@mui/material";
import {HeaderMenu} from "./components";
import {Home, About, Lookup} from "./pages";
import {makeStyles} from "@mui/styles";
import applicationStyles from "./styles";

/**
 * Creates style object, loaded from file, to pass to various page components.
 * Setup react router paths.
 * @returns {JSX.Element}
 */
const App = () => {
  const styles = makeStyles(applicationStyles)();
  return (
    <Box component="span">
      <HeaderMenu styles={styles}/>
      <Container>
        <Routes>
          <Route path="/"       element={<Home styles={styles}/>}/>
          <Route path="about"   element={<About styles={styles}/>}/>
          <Route path="lookup"  element={<Lookup styles={styles}/>}/>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
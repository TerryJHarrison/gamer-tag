import React from "react";
import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GamerTag from "./contracts/GamerTag.json";

import {useAccount, useContractRead, useNetwork} from 'wagmi'
import ClaimTagCards from "./components/ClaimTagCards";
import ManageTagCards from "./components/ManageTagCards";
import HeaderMenu from "./components/HeaderMenu";

const App = () => {
  const {activeChain} = useNetwork();
  const {data: account} = useAccount();
  const {data: tag} = useContractRead({
    addressOrName: GamerTag?.networks[activeChain?.id]?.address,
    contractInterface: GamerTag?.abi
  }, "getTag", {
    args: account?.address
  });

  const useStyles = makeStyles({
    root: {
      backgroundColor: "#000"
    },
    nickname: {
      marginBottom: 4
    },
    grow: {
      flexGrow: 1
    },
    topPadded: {
      paddingTop: 10
    },
    topMargined: {
      marginTop: 30
    }
  });
  const styles = useStyles();

  if (!account || tag === "") {
    return (
      <Box component="span">
        <HeaderMenu styles={styles}/>
        <Container className={styles.topPadded}>
          <ClaimTagCards styles={styles}
                         activeChain={activeChain}/>
        </Container>
      </Box>
    );
  }

  return (
      <Box component="span">
        <HeaderMenu styles={styles}/>
        <Container className={styles.topPadded}>
          <ManageTagCards styles={styles}
                          account={account}
                          tag={tag}
                          activeChain={activeChain}/>
        </Container>
      </Box>
  );
}

export default App;

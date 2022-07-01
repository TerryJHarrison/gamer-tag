import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {FloatingMobileWalletConnectButton, LookupAddressCard, LookupPlayerCard} from "../components";
import {useAccount} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";

/**
 * Player lookup page
 * @param styles
 * @returns {JSX.Element}
 */
const Lookup = ({styles}) => {
  const {isConnected} = useAccount();

  return isConnected ? (
    <>
      <LookupAddressCard styles={styles}/>
      <LookupPlayerCard styles={styles}/>
      <FloatingMobileWalletConnectButton styles={styles}/>
    </>
  ) : (
    <Card className={styles.topMargined}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Lookup a player
        </Typography>
        <Typography variant="standard">
          You'll need to connect with your wallet to look players up.
        </Typography>
        <br/><br/>
        <ConnectButton chainStatus="icon" showBalance={false} label="Connect to lookup players"/>
      </CardContent>
    </Card>
  )
}

export default Lookup;

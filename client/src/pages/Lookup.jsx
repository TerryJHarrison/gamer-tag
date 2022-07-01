import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LookupAddressCards from "../components/LookupAddressCards";
import LookupPlayerCards from "../components/LookupPlayerCards";
import {useAccount} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import MobileWalletConnectCard from "../components/MobileWalletConnectCard";

const Lookup = ({styles}) => {
  const {isConnected} = useAccount();

  return isConnected ? (
    <>
      <LookupAddressCards styles={styles}/>
      <LookupPlayerCards styles={styles}/>
      <MobileWalletConnectCard styles={styles}/>
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

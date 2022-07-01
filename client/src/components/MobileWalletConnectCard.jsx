import React from "react";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Card that is only shown on mobile (small) devices. Contains a wallet connect button.
 * @param styles
 * @returns {JSX.Element}
 */
const MobileWalletConnectCard = ({styles}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div className={isSmallScreen ? styles.mobileWalletConnect : styles.hide}>
      <ConnectButton chainStatus="icon" showBalance={false}/>
    </div>
  );
}

export default MobileWalletConnectCard;
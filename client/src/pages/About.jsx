import React from "react";
import {Card, CardContent, Link, Typography} from "@mui/material";
import {FloatingMobileWalletConnectButton} from "../components";

/**
 * About page
 * @param styles
 * @returns {JSX.Element}
 */
const About = ({styles}) => {
  return (
    <>
      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h5" component="h2">
            What is this?
          </Typography>
          <Typography color="textSecondary">
            A simple public utility. Claim a gamer tag for your address to be used by other dApps as your in-game display name. Tags are permanent, but you can always update your Nickname at any time to change your display name if you wish.
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Built for longevity
          </Typography>
          <Typography color="textSecondary">
            Every piece of the architecture is designed to be decentralized and permanent. We aren't quite there yet - see our roadmap on <Link href="https://github.com/TerryJHarrison/gamer-tag">GitHub</Link> to see where we are at in this process.
          </Typography>
          <Typography color="textSecondary">
            - Smart contract based backend
          </Typography>
          <Typography color="textSecondary" >
            - Completely immutable smart contract, no proxy
          </Typography>
          <Typography color="textSecondary">
            - No cost to use other than gas fees
          </Typography>
          <Typography color="textSecondary" >
            - Website deployed via IPFS
          </Typography>
          <Typography color="textSecondary">
            - Permanent domain name registered through Unstoppable Domains
          </Typography>
          <Typography color="textSecondary">
            - Ownership of domain transferred to the contract itself
          </Typography>
          <Typography color="textSecondary">
            - Everything is open source
          </Typography>

          <Typography variant="h7" component="h4" color="textSecondary">
            Built by <Link href="https://www.linkedin.com/in/tjharrisonjr/">TJ Harrison</Link>
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Developer Info
          </Typography>
          <br/>
          <Typography color="textSecondary">
            Contract and client code is open-source and can be found on <Link href="https://github.com/TerryJHarrison/gamer-tag">GitHub</Link>
          </Typography>
          <Typography color="textSecondary">
            &nbsp;&nbsp;- <Link href="https://github.com/TerryJHarrison/gamer-tag/blob/main/contracts/IGamerTag.sol">Solidity Interface</Link>
          </Typography>
          <Typography color="textSecondary">
            &nbsp;&nbsp;- <Link href="https://github.com/TerryJHarrison/gamer-tag/blob/main/client/src/contracts/GamerTag.json">ABI</Link>
          </Typography>
          <br/>
          <Typography color="textSecondary">
            The contract is verified on all networks it is deployed on:
          </Typography>
          <Typography color="textSecondary">
            &nbsp;&nbsp;- <Link href="https://mumbai.polygonscan.com/address/0x22Cbf865059c4DbaAb19101e81986e8b78D67688#code">Mumbai Testnet</Link>
          </Typography>
          <Typography color="textSecondary">
            &nbsp;&nbsp;- Polygon - coming soon...
          </Typography>
        </CardContent>
      </Card>

      <FloatingMobileWalletConnectButton styles={styles}/>
    </>
  );
}

export default About;

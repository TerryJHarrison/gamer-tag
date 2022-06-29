import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const About = ({styles}) => {
  return (
      <Box component="span">
        <Container className={styles.topPadded}>
          <Card className={styles.topPadded}>
            <CardContent>
              <Typography variant="h5" component="h2">
                What is this?
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                A simple public utility. Claim a tag for your address to be used by other dApps as your in-game display name. Tags are permanent, but you can always update your Nickname at any time to change your display name if you wish.
              </Typography>
            </CardContent>
          </Card>
          <Card className={styles.topMargined}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Built for longevity
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Every piece of the architecture is designed to be decentralized and permanent. We aren't quite there yet - see our roadmap on <Link href="https://github.com/TerryJHarrison/gamer-tag">GitHub</Link> to see where we are at in this process.
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - Smart contract based backend
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - Completely immutable smart contract, no proxy
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - No cost to use other than gas fees
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - Website deployed via IPFS
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - Permanent domain name registered through Unstoppable Domains
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - Ownership of domain transferred to the contract itself
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                - Everything is open source
              </Typography>
            </CardContent>
          </Card>
          <Card className={styles.topMargined}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Who built and manages this?
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                My name is <Link href="https://www.linkedin.com/in/tjharrisonjr/">TJ Harrison</Link>, this is a personal project of mine. I currently maintain it, but once the project is 100% decentralized I don't intend to push updates nor do I see the need for it be actively managed.
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Anyone else can always build their own newer, sleeker UI to interact with the contract (and is encouraged to, the more the merrier)!
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
  );
}

export default About;

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Developers = ({styles}) => {
  return (
      <Box component="span">
        <Container className={styles.topPadded}>
          <Card className={styles.topPadded}>
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
                &nbsp;&nbsp;- <Link href="https://mumbai.polygonscan.com/address/0x580d9b3f016b9759db279381877bf69e9dac22e1#code">Mumbai Testnet</Link>
              </Typography>
              <Typography color="textSecondary">
                &nbsp;&nbsp;- Polygon - coming soon...
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
  );
}

export default Developers;

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import GamerTag from "../contracts/GamerTag.json";
import {useContractWrite} from "wagmi";

const ClaimTagCards = ({styles, activeChain}) => {
  const [tagInput, setTagInput] = useState("");
  const {write: setTag} = useContractWrite({
      addressOrName: GamerTag?.networks[activeChain?.id]?.address,
      contractInterface: GamerTag?.abi
    }, 'claimTag'
  );

  const handleSetTag = () => {
    setTag({args: tagInput});
  };

  const handleTagChange = event => {
    setTagInput(event.target.value);
  };

  return (
    <>
      <Card className={styles.topPadded}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Choose your tag
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            You can only claim one tag, one time - choose carefully!
            <br/><br/>
            Your gamer tag will be permanently associated with the claiming address.<br/>
            Tags are unique, no one else will be able to claim yours.<br/>
            All tags start with a # character, example: #NugsyNash
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <TextField label="#YourGamerTag" value={tagInput} variant="standard" onChange={handleTagChange}/>
          <br/><br/>
          <Button color="primary" variant="contained" onClick={handleSetTag}>Claim Your Gamer Tag Now</Button>
          <Typography color="textSecondary" gutterBottom>
            The only cost to claim your tag is gas.
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h6" component="h3">
            Nicknames
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            After claiming your tag, you will have the option to set a nickname.<br/>
            If a nickname is set then it will be used as your in-game display name instead of your tag.<br/>
            All tags start with a @ character, example: @Nugsy
            <br/><br/>
            The only cost to change your nickname is gas.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ClaimTagCards;
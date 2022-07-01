import React, {useState} from "react";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {useGamerTag, useNotifications} from "../hooks";

const LookupAddressCard = ({styles}) => {
  const [tagInput, setTagInput] = useState("");
  const [address, setAddress] = useState("");
  const [tagClaimedTime, setTagClaimedTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const {notifyError} = useNotifications();
  const {getPlayerFromTag, getTagClaimTime} = useGamerTag();

  const formattedTag = tagInput.startsWith("#") ? tagInput.substring(1) : tagInput;
  const handleSearchByTag = async () => {
    const playerAddress = await getPlayerFromTag(formattedTag)
    if(playerAddress !== "0x0000000000000000000000000000000000000000") {
      const claimTime = await getTagClaimTime(playerAddress);
      setAddress(playerAddress);
      setErrorMessage("");
      setTagClaimedTime(claimTime);
    } else {
      setAddress("");
      const errorMessage = `No gamer going by #${formattedTag}`;
      notifyError(errorMessage);
      setErrorMessage(errorMessage);
      setTagClaimedTime(0);
    }
  };

  const handleTagChange = event => setTagInput(event.target.value);

  const d = new Date(tagClaimedTime * 1000); // Used for datetime formatting
  return (
    <Card className={styles.topMargined}>
      <CardContent>
        <Typography color="textSecondary">
          Find a player's address by tag.
        </Typography>
        <TextField label="#NugsyNash" value={tagInput} variant="standard" onChange={handleTagChange}/>
        <br/><br/>
        <Button color="primary" variant="contained" onClick={handleSearchByTag}>Lookup</Button>
        {address !== "" &&
          <>
            <Typography color="textSecondary">
              {address}
            </Typography>
            <Typography color="textSecondary">
            Gamer since {d.getFullYear()}-{d.getMonth() + 1}-{d.getDate()}
            </Typography>
          </>
        }
        {errorMessage &&
        <Typography color="error" className={styles.topPadded}>{errorMessage}</Typography>
        }
      </CardContent>
    </Card>
  );
}

export default LookupAddressCard;
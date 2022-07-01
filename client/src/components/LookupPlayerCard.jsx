import React, {useState} from "react";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {useGamerTag, useNotifications} from "../hooks";

const LookupPlayerCard = ({styles}) => {
  const [addressInput, setAddressInput] = useState("");
  const [tag, setTag] = useState("");
  const [nickname, setNickname] = useState("");
  const [tagClaimedTime, setTagClaimedTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const {notifyError} = useNotifications();
  const {getTag, getNickname, getTagClaimTime} = useGamerTag();

  const displayError = errorMessage => {
    // Clear loaded data from previous searches
    setTag("");
    setNickname("");
    setTagClaimedTime(0);

    // Display error message inline and in message stack
    setErrorMessage(errorMessage);
    notifyError(errorMessage);
  }

  const handleLookup = async () => {
    try {
      const tag = await getTag(addressInput);
      if (tag) {
        setTag(tag);
        setErrorMessage("");
        setTagClaimedTime(await getTagClaimTime(addressInput));
        setNickname(await getNickname(addressInput));
      } else {
        displayError("Address is not a gamer");
      }
    } catch (e) {
      if(e.code === "INVALID_ARGUMENT") {
        displayError("Not a valid address");
      } else {
        displayError("Unknown error, please try again");
      }
    }
  };

  const handleAddressChange = event => setAddressInput(event.target.value);

  const d = new Date(tagClaimedTime * 1000); // Used for datetime formatting
  return (
    <Card className={styles.topMargined}>
      <CardContent>
        <Typography color="textSecondary">
          Find a player's tag and current nickname using their address.
        </Typography>
        <TextField label="0x10..." value={addressInput} variant="standard" onChange={handleAddressChange}/>
        <br/><br/>
        <Button color="primary" variant="contained" onClick={handleLookup}>Lookup</Button>
        {tag !== "" &&
        <>
          <Typography color="textSecondary">
            #{tag}
          </Typography>
          <Typography color="textSecondary">
          Gamer since {d.getFullYear()}-{d.getMonth() + 1}-{d.getDate()}
          </Typography>
        </>
        }
        {nickname !== "" &&
        <Typography color="textSecondary">
          Going by @{nickname}
        </Typography>
        }
        {errorMessage &&
        <Typography color="error" className={styles.topPadded}>{errorMessage}</Typography>
        }
      </CardContent>
    </Card>
  );
}

export default LookupPlayerCard;
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import GamerTag from "../contracts/GamerTag.json";
import {useContractWrite, useNetwork} from "wagmi";
import {useSnackbar} from "notistack";

const LookupPlayerCards = ({styles}) => {
  const {chain} = useNetwork();
  const [addressInput, setAddressInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [tag, setTag] = useState("");
  const [tagClaimedTime, setTagClaimedTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const {enqueueSnackbar} = useSnackbar();

  const {writeAsync: getNickname} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getNickname",
    args: addressInput
  });

  const {writeAsync: getTag} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getTag",
    args: addressInput
  });

  const {writeAsync: tagClaimedAt} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "tagClaimedAt",
    args: addressInput
  });

  const displayError = errorMessage => {
    // Clear loaded data from previous searches
    setTag("");
    setNickname("");
    setTagClaimedTime(0);
    // Display error message inline and in message stack
    setErrorMessage(errorMessage);
    enqueueSnackbar(errorMessage, {
      variant: "error",
      anchorOrigin: {
        horizontal: "right",
        vertical: "bottom"
      }
    });
  }

  const handleLookup = async () => {
    try {
      const tag = await getTag();
      if (tag) {
        setTag(tag);
        setErrorMessage("");
        setTagClaimedTime(await tagClaimedAt());
        setNickname(await getNickname());
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

export default LookupPlayerCards;
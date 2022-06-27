import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import GamerTag from "../contracts/GamerTag.json";
import {useContractWrite, useNetwork} from "wagmi";
import {useSnackbar} from 'notistack';

const LookupAddressCards = ({styles}) => {
  const {activeChain} = useNetwork();
  const [tagInput, setTagInput] = useState("");
  const [address, setAddress] = useState("");
  const [tagClaimedTime, setTagClaimedTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const {enqueueSnackbar} = useSnackbar();

  const {writeAsync: tagLookup} = useContractWrite({
      addressOrName: GamerTag?.networks[activeChain?.id]?.address,
      contractInterface: GamerTag?.abi
    }, 'tagLookup'
  );
  const {writeAsync: tagClaimedAt} = useContractWrite({
    addressOrName: GamerTag?.networks[activeChain?.id]?.address,
    contractInterface: GamerTag?.abi
  }, "tagClaimedAt");

  const handleSearchByTag = async () => {
    const playerAddress = await tagLookup({args: tagInput.startsWith("#") ? tagInput.substring(1) : tagInput})
    if(playerAddress !== "0x0000000000000000000000000000000000000000") {
      const claimTime = await tagClaimedAt({args: playerAddress});
      setAddress(playerAddress);
      setErrorMessage("");
      setTagClaimedTime(claimTime);
    } else {
      setAddress("");
      enqueueSnackbar(`No gamer going by #${tagInput.startsWith("#") ? tagInput.substring(1) : tagInput}`, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom"
        }
      });
      setErrorMessage(`No gamer going by #${tagInput.startsWith("#") ? tagInput.substring(1) : tagInput}`);
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

export default LookupAddressCards;
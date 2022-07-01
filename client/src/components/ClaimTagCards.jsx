import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import GamerTag from "../contracts/GamerTag.json";
import {useContractWrite, useAccount, useNetwork, useWaitForTransaction} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useSnackbar} from "notistack";
import MobileWalletConnectCard from "./MobileWalletConnectCard";

const ClaimTagCards = ({styles}) => {
  const {chain} = useNetwork();
  const {isConnected} = useAccount();
  const [tagInput, setTagInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateTxn, setUpdateTxn] = useState("");
  const {enqueueSnackbar} = useSnackbar();

  const displayError = errorMessage => {
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

  const {write: setTag} = useContractWrite({
      addressOrName: GamerTag?.networks[chain?.id]?.address,
      contractInterface: GamerTag?.abi,
      functionName: "claimTag",
      onError(error) {
        if(error.reason === "execution reverted: GT: tag already claimed"){
          displayError("Tag has already been claimed, try another!");
        } else {
          displayError("Unknown error, please try again");
        }
      },
      onSuccess(data) {
        setUpdateTxn(data.hash);
        enqueueSnackbar("Claiming tag...", {
          variant: "info",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom"
          }
        });
        setErrorMessage("");
      }
    }
  );

  // Listen for successful setTag calls
  useWaitForTransaction({
    hash: updateTxn,
    onSuccess() {
      enqueueSnackbar("Gamer tag claimed!", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom"
        }
      });
      setUpdateTxn("");
    }
  })

  const handleSetTag = () => setTag({args: tagInput.startsWith("#") ? tagInput.substring(1) : tagInput});
  const handleTagChange = event => setTagInput(event.target.value);

  return (
    <>
      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Choose your tag
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            You can only claim one tag, one time - choose carefully!
            <br/><br/>
            Your gamer tag will be permanently associated with the claiming address.<br/>
            Tags are unique, no one else will be able to claim yours.<br/>
            All tags will be displayed with an <b>#</b> character, example: <b>#</b>NugsyNash
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <TextField label="#YourGamerTag" value={tagInput} variant="standard" onChange={handleTagChange}/>
          {errorMessage &&
          <Typography color="error">{errorMessage}</Typography>
          }
          {!errorMessage &&
          <><br/><br/></>
          }
          {!isConnected &&
          <ConnectButton chainStatus="icon" showBalance={false} label="Connect now to claim your tag"/>
          }
          {isConnected &&
          <Button color="primary" variant="contained" onClick={handleSetTag}>Claim Your Gamer Tag Now</Button>
          }
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
            All nicknames will be displayed with an <b>@</b> character, example: <b>@</b>Nugsy
            <br/><br/>
            The only cost to change your nickname is gas.
          </Typography>
        </CardContent>
      </Card>

      <MobileWalletConnectCard styles={styles}/>
    </>
  );
}

export default ClaimTagCards;
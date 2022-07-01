import React, {useState} from "react";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {FloatingMobileWalletConnectButton} from ".";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {useSetTag, useNotifications} from "../hooks";

const ClaimTagCards = ({styles}) => {
  const {isConnected} = useAccount();
  const [tagInput, setTagInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {notify, notifySuccess, notifyError} = useNotifications();

  const displayError = errorMessage => {
    // Display error message inline and in message stack
    setErrorMessage(errorMessage);
    notifyError(errorMessage);
  }

  const onSubmit = () => {
    notify("Claiming tag...")
    setErrorMessage("");
  }
  const onSuccess = () => notifySuccess("Gamer tag claimed!");
  const onError = error => {
    if(error.reason === "execution reverted: GT: tag already claimed"){
      displayError("Tag has already been claimed, try another!");
    } else {
      displayError("Unknown error, please try again");
    }
  }
  const {setTag} = useSetTag(onSubmit, onSuccess, onError);
  const handleSetTag = () => setTag(tagInput.startsWith("#") ? tagInput.substring(1) : tagInput);
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

      <FloatingMobileWalletConnectButton styles={styles}/>
    </>
  );
}

export default ClaimTagCards;
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import GamerTag from "../contracts/GamerTag.json";
import {useContractWrite, useConnect, useNetwork, useWaitForTransaction} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useSnackbar} from 'notistack';

const ClaimTagCards = ({styles}) => {
  const [tagInput, setTagInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {activeConnector} = useConnect();
  const {activeChain} = useNetwork();
  const {enqueueSnackbar} = useSnackbar();
  const [updateTxn, setUpdateTxn] = useState('');

  const {write: setTag} = useContractWrite({
      addressOrName: GamerTag?.networks[activeChain?.id]?.address,
      contractInterface: GamerTag?.abi
    }, 'claimTag', {
      onError(error) {
        if(error.reason === "execution reverted: GT: tag already claimed"){
          enqueueSnackbar("Tag has already been claimed, try another!", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "bottom"
            }
          });
          setErrorMessage("Tag has already been claimed, try another");
        } else {
          enqueueSnackbar("Unknown error, please try again", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "bottom"
            }
          });
          setErrorMessage("Unknown error, please try again");
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
      setUpdateTxn('');
    },
  })

  const handleSetTag = () => setTag({args: tagInput.startsWith("#") ? tagInput.substring(1) : tagInput});
  const handleTagChange = event => setTagInput(event.target.value);

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
            All tags will be displayed with a <b>#</b> character, example: <b>#</b>NugsyNash
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
          {!activeConnector &&
          <ConnectButton chainStatus="icon" showBalance={false} label="Connect now to claim your tag"/>
          }
          {activeConnector &&
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
            All nicknames will be displayed with a <b>@</b> character, example: <b>@</b>Nugsy
            <br/><br/>
            The only cost to change your nickname is gas.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ClaimTagCards;
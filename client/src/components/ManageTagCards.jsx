import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";
import {useContractRead, useContractWrite, useWaitForTransaction, useAccount, useNetwork} from "wagmi";
import {useSnackbar} from "notistack";
import GamerTag from "../contracts/GamerTag.json";
import MobileWalletConnectCard from "./MobileWalletConnectCard";

const ManageTagCards = ({tag, styles}) => {
  const {chain} = useNetwork();
  const {address} = useAccount();
  const {enqueueSnackbar} = useSnackbar();
  const [updateTxn, setUpdateTxn] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");

  const {data: nickname} = useContractRead({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getNickname",
    args: address,
    watch: true
  });

  const {data: tagClaimedAt} = useContractRead({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "tagClaimedAt",
    args: address
  });

  const {writeAsync: setNickname} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "setNickname",
    onSuccess(data) {
      setUpdateTxn(data.hash);
      enqueueSnackbar("Updating nickname...", {
        variant: "info",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom"
        }
      });
    }
  });

  // Listen for successful setNickname calls
  useWaitForTransaction({
    hash: updateTxn,
    onSuccess() {
      enqueueSnackbar("Nickname updated", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom"
        }
      });
      setUpdateTxn("");
    }
  })

  const handleNicknameChange = event => setNicknameInput(event.target.value);
  const handleSetNickname = async () => setNickname({args: nicknameInput.startsWith("@") ? nicknameInput.substring(1) : nicknameInput});
  const handleClearNickname = async () => setNickname({args: [""]});

  const d = new Date(tagClaimedAt * 1000); // Used for datetime formatting
  return (
    <>
      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h5" component="h2">
            #{tag}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Gamer since {d.getFullYear()}-{d.getMonth() + 1}-{d.getDate()}
          </Typography>
          <Typography color="textSecondary">
            {nickname !== "" &&
              <span>Going by <b>@{nickname}</b></span>
            }
            {nickname === "" &&
              <span>Going by <b>#{tag}</b></span>
            }
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <TextField label="@Nickname" value={nicknameInput} variant="standard" onChange={handleNicknameChange}/>
          <br/><br/>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button color="primary" onClick={handleSetNickname}>Change Nickname</Button>
            <Button color="secondary" onClick={handleClearNickname} disabled={nickname === ""}>Clear Nickname</Button>
          </ButtonGroup>
          <Typography color="textSecondary" gutterBottom>
            The only cost to update your nickname is gas.
          </Typography>
        </CardContent>
      </Card>

      <Card className={styles.topMargined}>
        <CardContent>
          <Typography variant="h6" component="h3">
            Nicknames
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            If a nickname is set then it will be used as your in-game display name instead of your tag.<br/>
            You may also clear your nickname if one is set, using your tag as your in-game display name again.<br/>
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

export default ManageTagCards;
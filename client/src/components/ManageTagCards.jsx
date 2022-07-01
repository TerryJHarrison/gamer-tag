import React, {useState} from "react";
import {Button, ButtonGroup, Card, CardContent, Typography, TextField} from "@mui/material";
import {FloatingMobileWalletConnectButton} from ".";
import {useGamerTag, useSetNickname, useNotifications} from "../hooks";

const ManageTagCards = ({tag, styles}) => {
  const [nicknameInput, setNicknameInput] = useState("");
  const {notify, notifySuccess} = useNotifications();
  const {nickname, tagClaimedAt} = useGamerTag();

  const onSubmit = () => notify("Updating nickname...")
  const onSuccess = () => notifySuccess("Nickname updated")
  const {setNickname} = useSetNickname(onSubmit, onSuccess);

  const handleNicknameChange = event => setNicknameInput(event.target.value);
  const handleSetNickname = async () => setNickname(nicknameInput.startsWith("@") ? nicknameInput.substring(1) : nicknameInput);
  const handleClearNickname = async () => setNickname("");

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

      <FloatingMobileWalletConnectButton styles={styles}/>
    </>
  );
}

export default ManageTagCards;
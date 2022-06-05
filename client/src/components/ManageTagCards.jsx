import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";
import {useContractRead, useContractWrite} from "wagmi";
import GamerTag from "../contracts/GamerTag.json";

const ManageTagCards = ({account, tag, styles, activeChain}) => {
  const {data: nickname} = useContractRead({
    addressOrName: GamerTag?.networks[activeChain?.id]?.address,
    contractInterface: GamerTag?.abi
  }, "getNickname", {
    args: account?.address
  });
  const {data: tagClaimedAt} = useContractRead({
    addressOrName: GamerTag?.networks[activeChain?.id]?.address,
    contractInterface: GamerTag?.abi
  }, "tagClaimedAt", {
    args: account?.address
  });

  const [nicknameInput, setNicknameInput] = useState("");
  const {write: setNickname} = useContractWrite({
      addressOrName: GamerTag?.networks[activeChain?.id]?.address,
      contractInterface: GamerTag?.abi,
    }, 'setNickname'
  );
  const d = new Date(tagClaimedAt * 1000); // Used for datetime formatting

  const handleNicknameChange = event => {
    setNicknameInput(event.target.value);
  };

  const handleSetNickname = () => {
    setNickname({args: nicknameInput});
  };

  const handleClearNickname = () => {
    setNickname({args: [""]});
  }

  return (
    <>
      <Card className={styles.topPadded}>
        <CardContent>
          <Typography variant="h5" component="h2">
            #{tag}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Claimed on {d.getFullYear()}-{d.getMonth() + 1}-{d.getDate()}
          </Typography>
          <Typography className={nickname} color="textSecondary">
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
            <Button color="secondary" onClick={handleClearNickname}>Clear Nickname</Button>
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
            All nicknames start with a @ character, example: @Nugsy
            <br/><br/>
            The only cost to change your nickname is gas.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ManageTagCards;
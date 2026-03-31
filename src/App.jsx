import { useEffect, useState } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";

import './App.css'
import useStyles from "./style";
import Main from "./Mains";
import MainInGame from "./MainsInGame";
import { mixCards, decoupe, distribution, getHighestCard, compterPoints, findIsWin } from "./Coinche";
import { ordreAtout, ordreNonAtout } from "./cartes";
import VictoryDialog from "./VictoryDialog";
import WaitDialog from "./WaitDialog";
import NewGameDialog from "./NewGameDialog";
import WaitingDecisionDialog from "./WaitingDecisionDialog";
import { Button, TextField, Typography } from "@mui/material";
import NewMancheDialog from "./NewMancheDialog";
import Game from "./Game";

function App() {

  const classes = useStyles()

  const players = usePlayersList();

  const [inLobby, setInLobby] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [roomName, setRoomName] = useState('')

  // afficher les lobbys de playroom kit
  useEffect(() => {
    if (inLobby) {
      insertCoin({ roomCode: roomName, maxPlayersPerRoom : 4})
        .then(() => setInGame(true))
        .catch((error) => {
          setInLobby(false)
        });
    }
  }, [inLobby]);

 
  const enterRoomName = (event) => {
    const value = event.target.value
    setRoomName(value)
  }

  return (
    <div>
      {!inLobby &&
        <div className={classes.preGame}>
          <Typography color='secondary' variant='h2'>COINCHE</Typography>
          <TextField label="Room ID" variant="outlined" color='secondary' onChange={enterRoomName} />
          <Typography variant='caption'>Room ID comporte seulement 4 caractères (ne pas prendre en compte le premier R)</Typography>
          <Button color='secondary' variant='outlined' onClick={() => setInLobby(true)} className={classes.buttonLobby}>Commencer</Button>
        </div>
      }
      {inGame &&
        <Game />
      }
    </div>
  )
}

export default App

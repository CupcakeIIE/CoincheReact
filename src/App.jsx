import { useEffect, useState } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer, getRoomCode } from "playroomkit";

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
  // useEffect(() => {
  //   if (inLobby) {
  //     insertCoin({ roomCode: roomName/* , maxPlayersPerRoom : 4 */})
  //     .then(() => /* {
  //       console.log('players', players, players.length)
  //       if (players.length === 4) { */
  //           setInGame(true)
  //           /* setInLobby(false)
  //         }
  //         // else {
  //         //   window.location.assign('/')
  //         // }
  //       } */)
  //       .catch((error) => {
  //         setInLobby(false)
  //       });
  //   }
  // }, [inLobby, players]);
  useEffect(() => {
    if (inLobby || roomName !== '') {
      insertCoin({ roomCode: roomName, maxPlayersPerRoom : 4})
      .then(() => setInGame(true))
      .catch((error) => setInLobby(false))
    }
  }, [inLobby, roomName]);

  // useEffect(() => {
  //   if (players.length === 4/*  && isHost() */) {
  //     setInGame(true)
  //     setInLobby(false)
  //   }
  // }, [players])

  useEffect(() => {
    if (inGame && players.length !== 4) {
      window.location.href = import.meta.env.BASE_URL
      // window.location.assign('/CoincheReact/')
    }
   }, [inGame, players])

  
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // enlève le "#"
      const r = params.get("r"); // "RP6R3"

      if (r) {
        setRoomName(r.substring(1)); // "P6R3"
      }
    }
  }, [])

 
  // console.log('players', players, players.length)

  const enterRoomName = (event) => {
    const value = event.target.value
    setRoomName(value)
  }

  // console.log('roomCode', getRoomCode())

  return (
    <div>
      {!inLobby && !inGame && roomName === '' &&
        <div className={classes.preGame}>
          <Typography color='secondary' variant='h2'>COINCHE</Typography>
          <TextField label="Room ID" variant="outlined" color='secondary' onChange={enterRoomName} />
          <Typography variant='caption'>Room ID comporte seulement 4 caractères (ne pas prendre en compte le premier R)</Typography>
          <Button color='secondary' variant='outlined' onClick={() => setInLobby(true)} className={classes.buttonLobby}>Commencer</Button>
        </div>
      }
      {inGame && players.length === 4 &&
        <Game />
      }
    </div>
  )
}

export default App

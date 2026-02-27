import { useEffect } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";
import { Typography } from '@mui/material';

import './App.css'
import Coinche from "./Coinche";
import useStyles from "./style";

function App() {

  const classes = useStyles()

  const players = usePlayersList();

  const [gameStarted, setGameStarted] = useMultiplayerState("gameStarted", false);

  const me = myPlayer();
  const meIndex = players.findIndex(player => me.id === player.id) 

  // lancer une partie si 4 personnes dans la room
  useEffect(() => {
    if (players.length === 4 && isHost()) {
      setGameStarted(true);
    }
  }, [players]);

  // afficher les lobbys de playroom kit
  useEffect(() => {
    insertCoin({
    });
  }, []);

  return (
    <div className={classes.gameBoard}>
      {gameStarted && 
        players.map((player, index) => (
          <Coinche indexMe={meIndex} player={player?.state?.profile?.name || `Player${index}`} index={index} />
      ))}
    </div>
  )
}

export default App

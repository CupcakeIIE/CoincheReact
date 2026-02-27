import { useEffect } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";
import { Typography } from '@mui/material';

import './App.css'
import Main from "./Mains";
import useStyles from "./style";
import { mixCards, decoupe, distribution } from "./Coinche";

function App() {

  const classes = useStyles()

  const players = usePlayersList();

  const [gameStarted, setGameStarted] = useMultiplayerState("gameStarted", false);
  const [cards, setCards] = useMultiplayerState("cards", []);

  const me = myPlayer();
  const meIndex = players.findIndex(player => me.id === player.id) 

  // lancer une partie si 4 personnes dans la room
  useEffect(() => {
    if (players.length === 4 && isHost()) {
      setGameStarted(true);
      setCards(distribution(decoupe(mixCards())))
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
          <Main indexMe={meIndex} player={player?.state?.profile?.name || `Player${index}`} index={index} cards={cards} />
      ))}
    </div>
  )
}

export default App

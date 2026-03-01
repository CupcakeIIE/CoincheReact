import { useEffect } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";

import './App.css'
import Main from "./Mains";
import useStyles from "./style";
import { mixCards, decoupe, distribution } from "./Coinche";
import { Button, Typography } from "@mui/material";

function App() {

  const classes = useStyles()

  const players = usePlayersList();

  const [gameStarted, setGameStarted] = useMultiplayerState("gameStarted", false);
  const [cards, setCards] = useMultiplayerState("cards", []);
  const [annonceAll, setAnnonceAll] = useMultiplayerState('annonceAll', Array(4).fill(''))
  const [turnPlayer, setTurnPlayer] = useMultiplayerState('turnPlayer', 0)
  const [openAnnonce, setOpenAnnonce] = useMultiplayerState('openAnnonce', false)

  const [lastAnnonce, setLastAnnonce] = useMultiplayerState('lastAnnonce', '')
  const [lastAnnoncePlayerIndex, setLastAnnoncePlayerIndex] = useMultiplayerState('lastAnnoncePlayerIndex', 0)
  const [coinche, setCoinche] = useMultiplayerState('coinche', false)
  const [nbPasses, setNbPasses] = useMultiplayerState('nbPasses', 0)

  const [gamePlaying, setGamePlaying] = useMultiplayerState('gamePlaying', false)

  const me = myPlayer();
  const meIndex = players.findIndex(player => me.id === player.id) 

  // lancer une partie si 4 personnes dans la room
  useEffect(() => {
    if (players.length === 4 && isHost()) {
      setGameStarted(true)
      setCards(distribution(decoupe(mixCards())))
      setOpenAnnonce(true)
    }
  }, [players]);

  // afficher les lobbys de playroom kit
  useEffect(() => {
    insertCoin({
    });
  }, []);

  // gerer la fin des annonces en fonction du nombre de passe et/ou de la coinche
  useEffect(() => {
    if (coinche)
      setGamePlaying(true)

    if (lastAnnonce !== '' && nbPasses >= 3)
      setGamePlaying(true)

    if (nbPasses >= 4 && lastAnnonce === '') {
      setCards(distribution(decoupe(mixCards())))
      setTurnPlayer((turnPlayer + 2) % 4)
    }
  }, [nbPasses, coinche, lastAnnonce])

  console.log('gamePlaying', gamePlaying)

  return (
    <div className={classes.gameBoard}>
      {/* {lastAnnonce !== '' && 
        <Typography>
          <b>{players[lastAnnoncePlayerIndex].state.profile.name}</b> a annoncé <b>{lastAnnonce}</b>
        </Typography>
      } */}
      {gameStarted && 
        players.map((player, index) => (
          <Main 
            indexMe={meIndex} 
            player={player?.state?.profile?.name || `Player${index}`} 
            index={index} 
            cards={cards} 
            annonceAll={annonceAll}
            setAnnonceAll={setAnnonceAll}
            turnPlayer={turnPlayer}
            setTurnPlayer={setTurnPlayer}
            openAnnonce={openAnnonce}
            setLastAnnonce={setLastAnnonce}
            setLastAnnoncePlayerIndex={setLastAnnoncePlayerIndex}
            nbPasses={nbPasses}
            setNbPasses={setNbPasses}
          />
      ))}
    </div>
  )
}

export default App

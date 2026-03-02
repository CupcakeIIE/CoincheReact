import { useEffect } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";

import './App.css'
import useStyles from "./style";
import Main from "./Mains";
import MainInGame from "./MainsInGame";
import { mixCards, decoupe, distribution } from "./Coinche";

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
  const [partance, setPartance] = useMultiplayerState('partance', 0)
  const [cardsPlayed, setCardsPlayed] = useMultiplayerState('cardsPlayed', Array(4).fill(''))
  const [atout, setAtout] = useMultiplayerState('atout', '')
  const [couleurJouee, setCouleurJouee] = useMultiplayerState('couleurJouee', '')

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
    if (coinche) {
      setGamePlaying(true)
      setTurnPlayer(partance)
      const annonceList = lastAnnonce.split(' ')
      setAtout(annonceList[1])
    }

    if (lastAnnonce !== '' && nbPasses >= 3) {
      setGamePlaying(true)
      setTurnPlayer(partance)
      const annonceList = lastAnnonce.split(' ')
      setAtout(annonceList[1])
    }

    if (nbPasses >= 4 && lastAnnonce === '') {
      setCards(distribution(decoupe(mixCards())))
      setTurnPlayer((turnPlayer + 2) % 4)
      setPartance(partance+1)
    }
  }, [nbPasses, coinche, lastAnnonce])

  console.log('atout', atout)

  return (
    <div className={classes.gameBoard}>
      {/* {lastAnnonce !== '' && 
        <Typography>
          <b>{players[lastAnnoncePlayerIndex].state.profile.name}</b> a annoncé <b>{lastAnnonce}</b>
        </Typography>
      } */}


      {/* afficher les mains des joueurs pendant les annonces != du in game (pour plus de simplicté de compréhension) */}
      {gameStarted && !gamePlaying &&
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

      {/* afficher les mains des joueurs quand la partie a commencé */}
      {gameStarted && gamePlaying &&
        players.map((player, index) => (
          <MainInGame
            indexMe={meIndex} 
            player={player?.state?.profile?.name || `Player${index}`} 
            index={index} 
            cards={cards} 
            setCards={setCards}
            annonceAll={annonceAll}
            turnPlayer={turnPlayer}
            setTurnPlayer={setTurnPlayer}
            cardsPlayed={cardsPlayed}
            setCardsPlayed={setCardsPlayed}
            couleurJouee={couleurJouee}
            setCouleurJouee={setCouleurJouee}
            atout={atout}
          />
      ))}
    </div>
  )
}

export default App

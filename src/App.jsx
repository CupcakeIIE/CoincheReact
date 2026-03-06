import { useEffect } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";

import './App.css'
import useStyles from "./style";
import Main from "./Mains";
import MainInGame from "./MainsInGame";
import { mixCards, decoupe, distribution, getHighestCard, compterPoints, findIsWin } from "./Coinche";
import { ordreAtout, ordreNonAtout } from "./cartes";
import VictoryDialog from "./VictoryDialog";

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
  const [highestCard, setHighestCard] = useMultiplayerState('highestCard', '')
  // const [indexHighestCard, setIndexHighestCard] = useMultiplayerState('indexHighestCard', 0)
  const [cardsDernierPli, setCardsDernierPli] = useMultiplayerState('cardsDernierPli', [])
  const [dernierPliWinningCard, setDernierPliWinningCard] = useMultiplayerState('dernierPliWinningCard', '')
  const [pointsPlayer, setPointsPlayer] = useMultiplayerState('pointsPlayer', Array(4).fill(0))
  const [plisPlayer, setPlisPlayer] = useMultiplayerState('plisPlayer', Array(4).fill(0))
  const [nbToursJoues, setNbToursJoues] = useMultiplayerState('nbToursJoues', 0)
  const [openWinDialog, setOpenWinDialog] = useMultiplayerState('openWinDialog', false)
  const [isWin, setIsWin] = useMultiplayerState('isWin', false)

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


  // savoir quelle carte est la plus forte dans celles déjà jouées
  // on recalcule à chaque fois qu'une carte est jouée
  useEffect(() => {
    const newHighestCard = getHighestCard(cardsPlayed, couleurJouee, atout)
    setHighestCard(newHighestCard)

    const isTourPasFini = cardsPlayed.some(c => c === '')
    if (!isTourPasFini) {
      const indexHighestCard = cardsPlayed.findIndex(c => c === newHighestCard)

      // compter les points et attribuer le pli
      setPointsPlayer(pointsPlayer.map((p, index) => {
        if (index === indexHighestCard) {
          const newPoints = p + compterPoints(cardsPlayed, couleurJouee, atout)
          return newPoints
        }
        else
          return p
      }))
      setPlisPlayer(plisPlayer.map((p, index) => {
        if (index === indexHighestCard) {
          const newNbPlis = p + 1
          return newNbPlis
        }
        else
          return
      }))

      // memoriser le dernier pli
      setCardsDernierPli([...cardsPlayed])
      setDernierPliWinningCard(newHighestCard)

      // lancer un nouveau tour
      setTurnPlayer(indexHighestCard)
      setCouleurJouee('')
      setCardsPlayed(Array(4).fill(''))

      // si les 8 tours ont été joués ouvrir la dialogue de victoire
      if (nbToursJoues + 1 >= 8) {
        setIsWin(findIsWin(pointsPlayer, plisPlayer, lastAnnonce, lastAnnoncePlayerIndex))
        setOpenWinDialog(true)
      }
      else
        setNbToursJoues(nbToursJoues + 1)
    }
  }, [cardsPlayed])

  console.log('pointsArray', pointsPlayer, cardsDernierPli)

  return (
    <div className={classes.gameBoard}>
      {/* {lastAnnonce !== '' && 
        <Typography>
          <b>{players[lastAnnoncePlayerIndex].state.profile.name}</b> a annoncé <b>{lastAnnonce}</b>
        </Typography>
      } */}

      <VictoryDialog win={isWin} open={openWinDialog} annoncePlayerIndex={lastAnnoncePlayerIndex} players={players} annonce={lastAnnonce} pointsPlayer={pointsPlayer} />

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
            partance={partance}
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
            highestCard={highestCard}
            partance={partance}
            cardsDernierPli={cardsDernierPli}
            dernierPliWinningCard={dernierPliWinningCard}
          />
      ))}
    </div>
  )
}

export default App

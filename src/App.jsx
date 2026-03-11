import { useEffect } from "react";
import { usePlayersList, insertCoin, useMultiplayerState, isHost, myPlayer } from "playroomkit";

import './App.css'
import useStyles from "./style";
import Main from "./Mains";
import MainInGame from "./MainsInGame";
import { mixCards, decoupe, distribution, getHighestCard, compterPoints, findIsWin } from "./Coinche";
import { ordreAtout, ordreNonAtout } from "./cartes";
import VictoryDialog from "./VictoryDialog";
import WaitDialog from "./WaitDialog";

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
  const [lastMise, setLastMise] = useMultiplayerState('lastMise', 0)
  const [coinche, setCoinche] = useMultiplayerState('coinche', false)
  const [nbPasses, setNbPasses] = useMultiplayerState('nbPasses', 0)
  const [relanceGame, setRelanceGame] = useMultiplayerState('relanceGame', false)

  const [okNextGame, setOkNextGame] = useMultiplayerState('okNextGame', Array(4).fill(false))
  const [nbManches, setNbManches] = useMultiplayerState('nbManches', 0)
  const [endGame, setEndGame] = useMultiplayerState('endGame', false)
  const [resetGame, setResetGame] = useMultiplayerState('resetGame', false)
  const [teamsPoints, setTeamsPoints] = useMultiplayerState('teamsPoints', [0, 0])

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
      setGameStarted(true, {reliable: true})
      setCards(distribution(decoupe(mixCards())), {reliable: true})
      setOpenAnnonce(true, {reliable: true})
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
      setGamePlaying(true, {reliable: true})
      setTurnPlayer(partance, {reliable: true})
      const annonceList = lastAnnonce.split(' ')
      setAtout(annonceList[1], {reliable: true})
    }

    if (lastAnnonce !== '' && nbPasses >= 3) {
      setGamePlaying(true, {reliable: true})
      setTurnPlayer(partance, {reliable: true})
      const annonceList = lastAnnonce.split(' ')
      setAtout(annonceList[1], {reliable: true})
    }

    if (nbPasses >= 4 && lastAnnonce === '') {
      setCards(distribution(decoupe(mixCards())), {reliable: true})
      setTurnPlayer((turnPlayer + 2) % 4, {reliable: true})
      setPartance((partance+1) % 4, {reliable: true})
      setNbManches(nbManches + 1, {reliable: true})
    }

    if (relanceGame) {
      setRelanceGame(false, {reliable: true}),
      setCards(distribution(decoupe(mixCards())), {reliable: true})
      setTurnPlayer((partance+1) % 4, {reliable: true})
      setPartance((partance+1) % 4, {reliable: true})
    }
  }, [nbPasses, coinche, lastAnnonce, relanceGame])


  // savoir quelle carte est la plus forte dans celles déjà jouées
  // on recalcule à chaque fois qu'une carte est jouée
  useEffect(() => {
    let newHighestCard;
    // console.log('cards + dernier pli', cardsPlayed, cardsDernierPli)
    if (cardsPlayed.some(c => c !== '' && !cardsPlayed.some((c, index) => c === cardsDernierPli[index]))) {
      newHighestCard = getHighestCard(cardsPlayed, couleurJouee, atout)
      setHighestCard(newHighestCard, {reliable: true})

      const isTourPasFini = cardsPlayed.some(c => c === '')
      // console.log('cards + toourFini', cardsPlayed, isTourPasFini)
      if (!isTourPasFini) {
        const indexHighestCard = cardsPlayed.findIndex(c => c === newHighestCard)

        // compter les points et attribuer le pli
        const dixDer = nbToursJoues === 7 ? 10 : 0
        setPointsPlayer(pointsPlayer.map((p, index) => {
          if (index === indexHighestCard) {
            const newPoints = p + compterPoints(cardsPlayed, couleurJouee, atout)
            return newPoints + dixDer
          }
          else
            return p
        }), {reliable: true})
        setPlisPlayer(plisPlayer.map((p, index) => {
          if (index === indexHighestCard) {
            const newNbPlis = p + 1
            return newNbPlis
          }
          else
            return p
        }), {reliable: true})

        // memoriser le dernier pli
        setCardsDernierPli([...cardsPlayed], {reliable: true})
        setDernierPliWinningCard(newHighestCard, {reliable: true})

        // console.log('wining card', newHighestCard, indexHighestCard)

        // lancer un nouveau tour
        setTurnPlayer(indexHighestCard, {reliable: true})
        setCouleurJouee('', {reliable: true})
        setCardsPlayed(Array(4).fill(''), {reliable: true})

        // si les 8 tours ont été joués ouvrir la dialogue de victoire
        if (nbToursJoues + 1 >= 8) {
          setIsWin(findIsWin(pointsPlayer, plisPlayer, lastAnnonce, lastAnnoncePlayerIndex), {reliable: true})
          setOpenWinDialog(true, {reliable: true})
        }
        else
          setNbToursJoues(nbToursJoues + 1, {reliable: true})
      }
    }
  }, [cardsPlayed])


  // si le nombre de manches dépasse 4 => indiquer la fin de la partie avec une dialog
  useEffect(() => {
    if (nbManches >= 4)
      setEndGame(true)
  }, [nbManches])

  // lancer la manche suivante => reset pleins de var
  useEffect(() => {
    if (isHost()) {
      setTurnPlayer((partance+1) % 4, {reliable: true})
      setPartance((partance+1) % 4, {reliable: true})
      setCards(distribution(decoupe(mixCards())), {reliable: true})
      setGamePlaying(false, {reliable: true})

      setAnnonceAll(Array(4).fill(''), {reliable: true})
      setOpenAnnonce(true, {reliable: true})
      setLastMise(0, {reliable: true})
      setCoinche(false, {reliable: true})
      setNbPasses(0, {reliable: true})
      setAtout('', {reliable: true})
      setCouleurJouee('', {reliable: true})
      setCardsPlayed(Array(4).fill(''), {reliable: true})
      setHighestCard('', {reliable: true})
      setCardsDernierPli(Array(4).fill(''), {reliable: true})
      setDernierPliWinningCard('', {reliable: true})
      setPointsPlayer(Array(4).fill(''), {reliable: true})
      setPlisPlayer(Array(4).fill(''), {reliable: true})
      setNbToursJoues(0, {reliable: true})
      
      // stocker les points faits
      const annonceArray = lastAnnonce.split(' ')
      const coinchePoints = (coinche ? annonceArray[0] : 0)
      if (isWin) {
        setTeamsPoints(teamsPoints.map((t, index) => {
          if (index === lastAnnoncePlayerIndex%2)
            return t + annonceArray[0] + coinchePoints
          else
            return t
        }))
      }
      else {
        setTeamsPoints(teamsPoints.map((t, index) => {
          if (index === lastAnnoncePlayerIndex%2)
            return t
          else
            return t + annonceArray[0] + coinchePoints
        }))
      }

      setIsWin(false, {reliable: true})
      setOpenWinDialog(false, {reliable: true})
      setLastAnnonce('', {reliable: true})
      setLastAnnoncePlayerIndex(0, {reliable: true})
      setCoinche(false, {reliable: true})
      setOkNextGame(Array(4).fill(false), {reliable: true})

      setResetGame(false)
    }
  }, [resetGame])

  useEffect(() => {
    if (!okNextGame.some(a => !a))
      setResetGame(true)
  }, [okNextGame])

  console.log('partance + turnPlayer', partance, turnPlayer)

  return (
    <div className={classes.gameBoard}>
      {/* {lastAnnonce !== '' && 
        <Typography>
          <b>{players[lastAnnoncePlayerIndex].state.profile.name}</b> a annoncé <b>{lastAnnonce}</b>
        </Typography>
      } */}

      <VictoryDialog 
        win={isWin} 
        open={openWinDialog && !okNextGame[meIndex]} 
        annoncePlayerIndex={lastAnnoncePlayerIndex} 
        players={players} annonce={lastAnnonce} 
        pointsPlayer={pointsPlayer} 
        nbManches={nbManches} 
        setNbManches={setNbManches} 
        // setResetGame={setResetGame} 
        setOpenWinDialog={setOpenWinDialog} 
        okNextGame={okNextGame} 
        setOkNextGame={setOkNextGame} 
        indexPlayer={meIndex}
      />
      <WaitDialog open={openWinDialog && okNextGame[meIndex]} />

      {/* afficher les mains des joueurs pendant les annonces != du in game (pour plus de simplicté de compréhension) */}
      {gameStarted && !gamePlaying && !openWinDialog &&
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
            lastAnnonce={lastAnnonce}
            setLastAnnonce={setLastAnnonce}
            lastAnnoncePlayerIndex={lastAnnoncePlayerIndex}
            setLastAnnoncePlayerIndex={setLastAnnoncePlayerIndex}
            nbPasses={nbPasses}
            setNbPasses={setNbPasses}
            partance={partance}
            setRelanceGame={setRelanceGame}
            setCoinche={setCoinche}
            lastMise={lastMise}
            setLastMise={setLastMise}
          />
      ))}

      {/* afficher les mains des joueurs quand la partie a commencé */}
      {gameStarted && gamePlaying && !openWinDialog &&
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

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

const Game = (/* {gameLaunched = false} */) => {

  const classes = useStyles()

  const players = usePlayersList();

  const [inLobby, setInLobby] = useState(false)
  const [accueil, setAccueil] = useState(true)
  const [roomName, setRoomName] = useState('')

  // const [gameLaunched, setGameLaunched] = useMultiplayerState('gameLaunched', false)
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
  const [raison, setRaison] = useMultiplayerState('raison', '')
  const [openNewMancheDialog, setOpenNewMancheDialog] = useMultiplayerState('openNewMancheDialog', Array(4).fill(false))
  const [mancheProcessing, setMancheProcessing] = useMultiplayerState('mancheProcessing', false)

  const [okNextGame, setOkNextGame] = useMultiplayerState('okNextGame', Array(4).fill(true))
  const [nbManches, setNbManches] = useMultiplayerState('nbManches', 0)
  const [nbManchesBis, setNbManchesBis] = useMultiplayerState('nbManchesBis', 0)
  const [endGame, setEndGame] = useMultiplayerState('endGame', false)
  const [resetGame, setResetGame] = useMultiplayerState('resetGame', false)
  const [teamsPoints, setTeamsPoints] = useMultiplayerState('teamsPoints', [0, 0])
  const [manchesPoints, setManchesPoints] = useMultiplayerState('manchesPoints', Array(4).fill(0))
  const [manchesTeamWin, setManchesTeamWin] = useMultiplayerState('manchesTeamWin', Array(4).fill(0))
  const [newGameDecision, setNewGameDecision] = useMultiplayerState('newGameDecision', Array(4).fill(null))

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
  const [pointsPlayerLastManche, setPointsPlayerLastManche] = useMultiplayerState('pointsPlayerLastManche', Array(4).fill(0))
  const [plisPlayer, setPlisPlayer] = useMultiplayerState('plisPlayer', Array(4).fill(0))
  const [nbToursJoues, setNbToursJoues] = useMultiplayerState('nbToursJoues', 0)
  const [openWinDialog, setOpenWinDialog] = useMultiplayerState('openWinDialog', false)
  const [isWin, setIsWin] = useMultiplayerState('isWin', false)
  const [handSorted, setHandSorted] = useMultiplayerState('handSorted', Array(4).fill(false))

  const [isBelote, setIsBelote] = useMultiplayerState('isBelote', false)
  const [indexBelote, setIndexBelote] = useMultiplayerState('indexBelote', 0)
  const [etapeBeloteSaid, setEtapeBeloteSaid] = useMultiplayerState('etapeBeloteSaid', 0)
  const [showBelote, setShowBelote] = useMultiplayerState('showBelote', false)
  const [beloteAskedArray, setBeloteAskedArray] = useMultiplayerState('beloteAskedArray', Array(4).fill(false))
  const [beloteDialogOpen, setBeloteDialogOpen] = useMultiplayerState('beloteDialogOpen', false)

  const me = myPlayer();
  const meIndex = players.findIndex(player => me.id === player.id) 

  // console.log('roomName', roomName)

  // console.log('players', players[0]?.state?.profile)
  console.log('ingame', players)

  // lancer une partie si 4 personnes dans la room
  useEffect(() => {
    if (players.length === 4 && isHost()/*  && gameLaunched */) {
      setGameStarted(true, {reliable: true})
      setCards(distribution(decoupe(mixCards())), {reliable: true})
      setOpenAnnonce(true, {reliable: true})
    }
    else if (players.length < 4 && gameStarted) {
      window.location.assign('/');
    }
    else if (endGame && newGameDecision.some(d => d === false))
      window.location.assign('/')

    else if (endGame && !newGameDecision.some(d => d === false)) {
      setNbManches(-1, {reliable: true})
      setEndGame(false, {reliable: true})
    }

    // else if (!inLobby) {
    //   window.location.assign('/')
    // }
  }, [players, newGameDecision, endGame, inLobby/* , gameLaunched */]);

  // afficher les lobbys de playroom kit
  // useEffect(() => {
  //   if (inLobby) {
  //     insertCoin({ roomCode: roomName})
  //   }
  // }, [inLobby]);

  

  useEffect(() => {
    if (nbPasses === 0 && mancheProcessing && isHost()) {
      setMancheProcessing(false, {reliable: true});
    }
  }, [nbPasses]);

  // gerer la fin des annonces en fonction du nombre de passe et/ou de la coinche
  useEffect(() => {
    if (isHost()) {
      if (coinche) {
        setGamePlaying(true, {reliable: true})
        setTurnPlayer(partance, {reliable: true})
        const annonceList = lastAnnonce.split(' ')
        setAtout(annonceList[1], {reliable: true})
        setNbPasses(0, {reliable: true})
        setAnnonceAll(annonceAll.map(a => {
          if (a === 'Coinche' || a === lastAnnonce)
            return a
          else
            return ''
        }), {reliable: true})
      }

      if (lastAnnonce !== '' && nbPasses >= 3) {
        setGamePlaying(true, {reliable: true})
        setTurnPlayer(partance, {reliable: true})
        const annonceList = lastAnnonce.split(' ')
        setAtout(annonceList[1], {reliable: true})
        setNbPasses(0, {reliable: true})
        setAnnonceAll(annonceAll.map(a => {
          if (a === 'Coinche' || a === lastAnnonce)
            return a
          else
            return ''
        }), {reliable: true})
      }

      if (nbPasses >= 4 && lastAnnonce === '' && !mancheProcessing && nbManches === nbManchesBis) {
        setMancheProcessing(true)
        setCards(distribution(decoupe(mixCards())), {reliable: true})
        setTurnPlayer((partance+1) % 4, {reliable: true})
        setPartance((partance+1) % 4, {reliable: true})
        setNbManches(nbManches + 1, {reliable: true})
        setNbPasses(0, {reliable: true})
        setAnnonceAll(Array(4).fill(''), {reliable: true})
        setOpenNewMancheDialog(Array(4).fill(true), {reliable: true})
        setRaison('4 passes', {reliable: true})
        // console.log('passes', nbManches, nbPasses)
      }

      if (relanceGame) {
        setRelanceGame(false, {reliable: true}),
        setCards(distribution(decoupe(mixCards())), {reliable: true})
        setTurnPlayer(partance, {reliable: true})
        setNbPasses(0, {reliable: true})
        setAnnonceAll(Array(4).fill(''), {reliable: true})
        setOpenNewMancheDialog(Array(4).fill(true), {reliable: true})
        setRaison('relance', {reliable: true})
        // setPartance((partance+1) % 4, {reliable: true})
      }
    }
  }, [nbPasses, coinche, lastAnnonce, relanceGame])

  // console.log('belotedialogopne', beloteDialogOpen)

  // savoir quelle carte est la plus forte dans celles déjà jouées
  // on recalcule à chaque fois qu'une carte est jouée
  useEffect(() => {
    if (isHost() && !beloteDialogOpen) {
      
      let newHighestCard;
      // console.log('cards + dernier pli', cardsPlayed, cardsDernierPli)
      if (cardsPlayed.some(c => c !== '') && !cardsPlayed.some((c, index) => c === cardsDernierPli[index])) {
        newHighestCard = getHighestCard(cardsPlayed, couleurJouee, atout)
        setHighestCard(newHighestCard, {reliable: true})

        const isTourPasFini = cardsPlayed.some(c => c === '')
        // console.log('cards + toourFini', cardsPlayed, isTourPasFini)
        if (!isTourPasFini) {
          const indexHighestCard = cardsPlayed.findIndex(c => c === newHighestCard)
          // console.log('index + carte', indexHighestCard, newHighestCard)

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
            setOkNextGame(Array(4).fill(false), {reliable: true})
            setNbToursJoues(nbToursJoues + 1, {reliable: true})
          }
          else
            setNbToursJoues(nbToursJoues + 1, {reliable: true})
        }
      }
    }
  }, [cardsPlayed, beloteDialogOpen])


  // si le nombre de manches dépasse 4 => indiquer la fin de la partie avec une dialog
  useEffect(() => {
    if (nbManches >= 4)
      setEndGame(true)
  }, [nbManches])

  // lancer la manche suivante => reset pleins de var
  useEffect(() => {
    if (isHost() && resetGame && lastMise !== 0) {
      setResetGame(false)

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
      setPointsPlayerLastManche([...pointsPlayer])
      setPointsPlayer(Array(4).fill(''), {reliable: true})
      setPlisPlayer(Array(4).fill(''), {reliable: true})
      setNbToursJoues(0, {reliable: true})
      setBeloteAskedArray(Array(4).fill(false), {reliable: true})
      
      // stocker les points faits
      const pointsFaits = {
        '80': 80,
        '90': 90,
        '100': 100,
        '110': 110,
        '120': 120,
        '130': 130,
        '140': 140,
        '150': 150,
        '160': 160,
        '170': 170,
        '180': 180,
        'Capot': 250,
        'Générale': 500,
      }
      const coinchePoints = (coinche ? pointsFaits[lastMise] : 0)
      
      // lastMise === 'Générale' ? 500 : (lastMise === 'Capot' ? 250 : lastMise)

      if (isWin) {
        setTeamsPoints(teamsPoints.map((t, index) => {
          if (index === lastAnnoncePlayerIndex%2)
            return t + pointsFaits[lastMise] + coinchePoints
          else
            return t
        }), {reliable: true})

        setManchesTeamWin(manchesTeamWin.map((m, index) => {
          if (index === nbManches)
            return lastAnnoncePlayerIndex % 2
          else
            return m
        }), {reliable: true})
      }
      else {
        setTeamsPoints(teamsPoints.map((t, index) => {
          if (index === lastAnnoncePlayerIndex%2)
            return t
          else
            return t + pointsFaits[lastMise] + coinchePoints
        }), {reliable: true})

        setManchesTeamWin(manchesTeamWin.map((m, index) => {
          if (index === nbManches)
            return (lastAnnoncePlayerIndex + 1) % 2
          else
            return m
        }), {reliable: true})
      }

      setManchesPoints(manchesPoints.map((m, index) => {
        if (index === nbManches)
          return m + pointsFaits[lastMise] +  coinchePoints
        else
          return m
      }), {reliable: true})

      setIsWin(false, {reliable: true})
      // setOpenWinDialog(false, {reliable: true})
      setLastAnnonce('', {reliable: true})
      setLastAnnoncePlayerIndex(0, {reliable: true})
      setCoinche(false, {reliable: true})
      // setOkNextGame(Array(4).fill(true), {reliable: true})
      setNbManches(nbManches + 1, {reliable: true})
    }
  }, [resetGame])

  useEffect(() => {
    if (nbToursJoues >= 8)
      setResetGame(true)
  }, [nbToursJoues])

  const enterRoomName = (event) => {
    const value = event.target.value
    setRoomName(value)
  }

  // console.log('nbManches', nbManches, nbPasses)

  return (
    <div>
      {/* {!inLobby &&
        <div className={classes.preGame}>
          <Typography color='secondary' variant='h2'>COINCHE</Typography>
          <TextField label="Room ID" variant="outlined" color='secondary' onChange={enterRoomName} />
          <Typography variant='caption'>Room ID comporte seulement 4 caractères (ne pas prendre en compte le premier R)</Typography>
          <Button color='secondary' variant='outlined' onClick={() => setInLobby(true)} className={classes.buttonLobby}>Commencer</Button>
        </div>
      } */}
      {/* inLobby &&  */<div className={classes.gameBoard}>
        {/* {lastAnnonce !== '' && 
          <Typography>
            <b>{players[lastAnnoncePlayerIndex].state.profile.name}</b> a annoncé <b>{lastAnnonce}</b>
          </Typography>
        } */}

        <NewGameDialog 
          open={endGame && !newGameDecision[meIndex]} 
          newGameDecision={newGameDecision}
          setNewGameDecision={setNewGameDecision}
          indexPlayer={meIndex}
        />
        <WaitingDecisionDialog open={endGame && newGameDecision[meIndex]} />

        <VictoryDialog 
          win={isWin} 
          open={openWinDialog && !okNextGame[meIndex]} 
          annoncePlayerIndex={lastAnnoncePlayerIndex} 
          players={players} annonce={lastAnnonce} 
          pointsPlayer={pointsPlayerLastManche} 
          nbManches={nbManches} 
          setNbManches={setNbManches} 
          // setResetGame={setResetGame} 
          setOpenWinDialog={setOpenWinDialog} 
          okNextGame={okNextGame} 
          setOkNextGame={setOkNextGame} 
          indexPlayer={meIndex}
        />
        {/* <WaitDialog open={openWinDialog && okNextGame[meIndex]} /> */}

        <NewMancheDialog
          open={openNewMancheDialog[meIndex]}
          indexMe={meIndex}
          openNewMancheDialog={openNewMancheDialog}
          setOpenNewMancheDialog={setOpenNewMancheDialog}
          raison={raison}
        />

        {/* afficher les mains des joueurs pendant les annonces != du in game (pour plus de simplicté de compréhension) */}
        {gameStarted && !gamePlaying && !openNewMancheDialog[meIndex] && okNextGame[meIndex] &&
          players.map((player, index) => (
            <Main 
              indexMe={meIndex} 
              player={player?.state?.profile?.name || `Player${index}`} 
              photo={player?.state?.profile?.photo || ''}
              color={players[meIndex]?.state?.profile?.color || '#87fdff'}
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

              // for scores dialog
              nbManches={nbManches}
              setNbManchesBis={setNbManchesBis}
              players={players}
              manchesPoints={manchesPoints}
              manchesTeamWin={manchesTeamWin}
            />
        ))}

        {/* afficher les mains des joueurs quand la partie a commencé */}
        {gameStarted && gamePlaying && !openWinDialog &&
          players.map((player, index) => (
            <MainInGame
              indexMe={meIndex} 
              player={player?.state?.profile?.name || `Player${index}`} 
              photo={player?.state?.profile?.photo || ''}
              color={players[meIndex]?.state?.profile?.color || '#87fdff'}
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

              // for scores dialog
              nbManches={nbManches}
              players={players}
              manchesPoints={manchesPoints}
              manchesTeamWin={manchesTeamWin}

              handSorted={handSorted}
              setHandSorted={setHandSorted}

              // belote
              isBelote={isBelote}
              setIsBelote={setIsBelote}
              indexBelote={indexBelote}
              setIndexBelote={setIndexBelote}
              etapeBeloteSaid={etapeBeloteSaid}
              setEtapeBeloteSaid={setEtapeBeloteSaid}
              showBelote={showBelote}
              setShowBelote={setShowBelote}
              beloteAskedArray={beloteAskedArray}
              setBeloteAskedArray={setBeloteAskedArray}
              setBeloteDialogOpen={setBeloteDialogOpen}

              pointsPlayer={pointsPlayer}
              setPointsPlayer={setPointsPlayer}
            />
        ))}
      </div>}
    </div>
  )
}

export default Game

import { Backdrop, Button, IconButton, Portal, SpeedDial, SpeedDialAction, SpeedDialIcon, Switch, Tooltip, Typography } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import RadarIcon from '@mui/icons-material/Radar';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import useStyles from "./style";
import { ordreAtout } from "./cartes";
import { useEffect, useState } from "react";
import DernierPliDialog from "./DernierPliDialog";
import { getComplementaryColor, isJouable, sortCards, thereIsBelote } from "./Coinche";
import ScoreDialog from "./ScoreDialog";
import BeloteDialog from "./BeloteDialog";
import ReglesDialog from "./ReglesDialog";

const MainInGame = ({
  indexMe = 0, 
  player= '', 
  photo = '',
  color = '#87fdff',
  index = 0, 
  cards = [], setCards,
  annonceAll = [],
  turnPlayer = 0, setTurnPlayer, 
  cardsPlayed = [], setCardsPlayed,
  couleurJouee = '', setCouleurJouee,
  atout = '',
  highestCard = '',
  partance = 0,
  cardsDernierPli = [],
  dernierPliWinningCard = '',
  
  // for scores dialog
  nbManches = 0,
  players = [],
  manchesPoints = [],
  manchesTeamWin = [],

  handSorted = [], setHandSorted,

  isBelote = false, setIsBelote,
  indexBelote = 0, setIndexBelote,
  etapeBeloteSaid = 0, setEtapeBeloteSaid,
  showBelote = false, setShowBelote,
  beloteAskedArray = [], setBeloteAskedArray,

  pointsPlayer = [], setPointsPlayer,
}) => {

  const classes = useStyles()

  const cardBack = '/Cartes/card_back.png'

  // see for -212px => strange should be universal for all kind of screens
  const styleTop = {top: '0px', transform: 'translate(-50%, 0%) rotate(180deg)', zIndex: 0}
  const styleLeft = {left: '0px', top: '50%', transform: 'translate(-0%, -50%) rotate(90deg)', zIndex: 0}
  const styleRight = {right: '0px', top: '50%', transform: 'translate(0%, -50%) rotate(270deg)', zIndex: 0}
  const styleBottom = {bottom: '0px', transform: 'translate(-50%, 0%)', zIndex: 0}

  const isMe = indexMe === index
  const myCards = cards.slice(index*8, (index+1)*8)
  const myCardsSorted = sortCards(myCards, atout)

  const [openDernierPli, setOpenDernierPli] = useState(false)
  const [openScores, setOpenScores] = useState(false)
  const [openRegles, setOpenRegles] = useState(false)

  useEffect(() => {
    if (!myCards.some(carte => carte === null) && !beloteAskedArray[indexMe]) {
      const beloteOrNot = thereIsBelote(myCards, atout)
      // console.log('belotons', beloteOrNot)
      if (beloteOrNot) {
        setIsBelote(true)
        setIndexBelote(indexMe)
        // setShowBelote(true)
      }
      setBeloteAskedArray(beloteAskedArray.map((b, index) => {
        if (index === indexMe)
          return true
        else
          return b
      }))
    }
  }, [myCards, beloteAskedArray])

  // to know where to display the cards (top, left, right or bottom)
  // a player always see his card on the bottom
  const getUsedStyle = (index) => {
    const i = (index - indexMe + 4) % 4;
    if (i === 0)
      return styleBottom
    else if (i === 1)
      return styleLeft
    else if (i === 2)
      return styleTop
    else if (i === 3)
      return styleRight
  }

  const clickCard = (card, indexCarte) => {
    const cardList = card.split(' ')

    if (atout !== 'Sans' && atout !== 'Tout' && cardList[0] === atout && (cardList[1] === 'Roi' || cardList[1] === 'Dame'))
      setEtapeBeloteSaid(etapeBeloteSaid + 1)

    // si première carte du pli, sauvegarder la couleur
    if  (couleurJouee === '')
      setCouleurJouee(cardList[0], {reliable: true})

    setCardsPlayed(cardsPlayed.map((c, i) => {
      if (i === turnPlayer)
        return card
      else 
        return c
    }), {reliable: true})
    setCards(cards.map((c, i) => {
      if (i === indexCarte + indexMe*8)
        return ''
      else return c
    }), {reliable: true})
    setTurnPlayer((turnPlayer+1) % 4, {reliable: true})
  }


  const styleTopCard = {top: '50%', left: '50%', transform: 'translate(-50%, -150%) rotate(180deg)'}
  const styleLeftCard = {left: '50%', top:' 50%', transform: 'translate(-200%, -50%) rotate(90deg)'}
  const styleRightCard = {right: '50%', top: '50%', transform: 'translate(200%, -50%) rotate(270deg)'}
  const styleBottomCard = {bottom: '50%', left: '50%', transform: 'translate(-50%, 150%'}  
  // const styleTopCard = {top: '0px', transform: 'rotate(180deg)'}
  // const styleLeftCard = {left: '-212px', transform: 'rotate(90deg)'}
  // const styleRightCard = {right: '-212px', transform: 'rotate(270deg)'}
  // const styleBottomCard = {bottom: '0px'}
  const getUsedStyleInGame = (index) => {
    const i = (index - indexMe + 4) % 4;
    if (i === 0)
      return styleBottomCard
    else if (i === 1)
      return styleLeftCard
    else if (i === 2)
      return styleTopCard
    else if (i === 3)
      return styleRightCard
  }

  const clickDernierPli = () => {
    setOpenDernierPli(true)
  }

  const clickSwitchHandSorted = () => {
    setHandSorted(handSorted.map((h, index) => {
      if (index === indexMe)
        return !h
      else
        return h
    }))
  }

  // speed dial button 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const actions = [
    { icon: <VisibilityIcon color='secondary' />, name: 'Dernier Pli', onClick: clickDernierPli, show: (cardsDernierPli.length !== 0) },
    { icon: (handSorted[indexMe] ? <FilterListOffIcon color='secondary' /> : <FilterListIcon color='secondary' />), name: (handSorted[indexMe] ? 'De-Trier' : 'Trier'), onClick: clickSwitchHandSorted, show: true },
    { icon: <RadarIcon color='secondary' />, name: 'Scores', onClick: () => setOpenScores(true), show: true },
    { icon: <InfoOutlineIcon color='secondary' />, name: 'Règles', onClick: () => setOpenRegles(true), show: true },
  ];

  // console.log('belote', isBelote, indexBelote)

  return (
    <div>
    
      {indexMe === index && 
        <Backdrop open={open} sx={{zIndex: 1, pointerEvents: 'none'}} />}
      <div>

        <DernierPliDialog 
          openDernierPli={openDernierPli} 
          setOpenDernierPli={setOpenDernierPli} 
          cardsDernierPli={cardsDernierPli} 
          dernierPliWinningCard={dernierPliWinningCard}
          indexJoueur={indexMe}
        />

        <ReglesDialog
          open={indexMe === index && openRegles}
          setOpen={setOpenRegles}
        />

        <BeloteDialog
          open={indexMe === index && !showBelote && indexBelote === indexMe && isBelote && etapeBeloteSaid === 1}
          setShowBelote={setShowBelote}
          pointsPlayer={pointsPlayer}
          setPointsPlayer={setPointsPlayer}
          indexPlayer={indexMe}
        />
        
        <ScoreDialog
          open={openScores && index === indexMe}
          setOpen={setOpenScores}
          
          // for scores dialog
          nbManches={nbManches}
          players={players}
          manchesPoints={manchesPoints}
          manchesTeamWin={manchesTeamWin}
        />

        {/* afficher au centre les cartes jouées pour ce pli */}
        {index === indexMe &&
          cardsPlayed.map((carte, i) => (
            <div className={classes.boxCarte} style={getUsedStyleInGame(i)}>
              {carte && <img src={`/Cartes/${carte}.png`} className={classes.imgCard} />}
            </div>
        ))}

        <div style={getUsedStyle(index)} className={classes.mains}>
          {/* {index === indexMe &&
            <Tooltip title="Scores">
              <IconButton className={classes.buttonDernierPli} color="secondary" onClick={() => setOpenScores(true)}>
                <RadarIcon />
              </IconButton>
            </Tooltip>
          } */}
          {/* {index === indexMe && cardsDernierPli.length !== 0 &&
            <Tooltip title="Consulter le dernier pli">
              <IconButton className={classes.buttonDernierPli} color="secondary" onClick={clickDernierPli}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          } */}
          <div>
            {index === indexBelote && showBelote &&
              (etapeBeloteSaid === 1 ? <i>Belote</i>
              : (etapeBeloteSaid === 2 ? <i>Belote - ReBelote</i> : <i></i>))
            }

            <div className={index === turnPlayer ? classes.colorPlayer : classes.noColorPlayer} style={{backgroundColor: (index === turnPlayer && color)}}>
              <div className={classes.textMain}>
                <div className={classes.nameMain}>
                  {index === partance && <Brightness1Icon color='secondary' />}
                  <div>
                    <img src={photo} width='50px' />
                  </div>
                  <Typography style={{color: (index === indexMe ? (index === turnPlayer ? getComplementaryColor(color) : color) : '#000')}} className={classes.namePlayer} variant="h5"><b>{player}</b></Typography>
                </div>
                <Typography><b>{annonceAll[index]}</b></Typography>
              </div>
              <div>
                {(handSorted[indexMe] ? myCardsSorted : myCards).map((card, i) => {
                  const putClickable = isJouable(myCards, card, couleurJouee, atout, highestCard, cardsPlayed, indexMe)
                  return (
                    <Button 
                      key={i} 
                      className={classes.buttonCards} 
                      disabled={(indexMe !== index || indexMe !== turnPlayer) || !putClickable || !card}
                      onClick={() => clickCard(card, i)}
                    >
                      {card && <img src={isMe ? `/Cartes/${card}.png` : cardBack} className={classes.imgCard} />}
                      {card && isMe && indexMe === turnPlayer && putClickable && <div className={classes.cardOverlay}></div>}
                    </Button>
                )})}
              </div>
            </div>
          </div>
          {/* {index === indexMe && 
            <Tooltip title='Trier' className={classes.tooltipClass}>
              <FilterListOffIcon color='secondary' />
              <Switch 
                checked={handSorted[indexMe]} 
                onChange={clickSwitchHandSorted}
                color='secondary'
                />
              <FilterListIcon color="secondary" />
            </Tooltip>
          }
          {index === indexMe &&
            <Tooltip title="Règles">
              <IconButton className={classes.buttonDernierPli} color="secondary">
                <InfoOutlineIcon />
              </IconButton>
            </Tooltip>
          } */}
          {indexMe === index &&
          <Portal>
            <SpeedDial
              icon={<SpeedDialIcon />}
              ariaLabel="Actions du jeu"      // obligatoire ou ça plante (me demandez pas pourquoi)
              sx={{ position: 'fixed', bottom: 16, left: '70%', zIndex: 2}}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
              FabProps={{
                sx: { zIndex: 2, '&:focus': {
                  outline: 'none',
                }, },
                color: 'secondary',
              }}
            >
              {actions.map((action) => (action.show &&
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  onClick={action.onClick}
                  slotProps={{
                    fab: {
                      sx: {
                        '&:focus': {
                          outline: 'none',
                          boxShadow: 'none',
                        },
                      },
                    },
                    tooltip: {
                      open: true,
                      title: action.name,
                      componentsProps: {
                        tooltip: {
                          sx: {
                            maxWidth: 500,
                          },
                        },
                      },
                    },
                  }}
                />
              ))}
            </SpeedDial>
          </Portal>}
        </div>
      </div>
    </div>
  )
}

export default MainInGame;
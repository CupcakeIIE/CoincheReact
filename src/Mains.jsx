import { Backdrop, Button, IconButton, Portal, setRef, SpeedDial, SpeedDialAction, SpeedDialIcon, Tooltip, Typography } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import RadarIcon from '@mui/icons-material/Radar';

import useStyles from "./style";
import AnnonceDialog from "./AnnonceDialog";
import { useEffect, useState } from "react";
import RelanceDialog from "./RelanceDialog";
import { pointsDebut } from "./Coinche";
import CoincheDialog from "./CoincheDialog";
import ScoreDialog from "./ScoreDialog";

const Main = ({
  indexMe = 0, 
  player= '', 
  index = 0, 
  cards = [], 
  annonceAll = [], setAnnonceAll, 
  turnPlayer = 0, setTurnPlayer, 
  openAnnonce = false,
  lastAnnonce = '', setLastAnnonce,
  lastAnnoncePlayerIndex = 0, setLastAnnoncePlayerIndex,
  nbPasses = 0, setNbPasses,
  partance = 0,
  setRelanceGame,
  setCoinche,
  lastMise = 0, setLastMise,
  
  // for scores dialog
  nbManches = 0,
  players = [],
  manchesPoints = [],
  manchesTeamWin = [],
}) => {

  const classes = useStyles()

  const [showAnnonce, setShowAnnonce] = useState(true)

  const [showRelance, setShowRelance] = useState(false)
  const [canRelance, setCanRelance] = useState(true)
  const [displayRelance, setDisplayRelance] = useState(true)

  const [showCoinche, setShowCoinche] = useState(false)
  const [displayCoinche, setDisplayCoinche] = useState(true)
  // const [canCoinche, setCanCoinche] = useState(true)

  const [openScores, setOpenScores] = useState(false)

  const cardBack = '/Cartes/card_back.png'

  // see for -212px => strange should be universal for all kind of screens
  // const styleTop = {top: '0px', transform: 'rotate(180deg)'}
  // const styleLeft = {left: '0px', transform: 'translate(-0%, 200%) rotate(90deg)'}
  // const styleLeft = {left: '-212px', transform: 'rotate(90deg)'}
  // const styleRight = {right: '0px', transform: 'translate(-0%, 200%) rotate(270deg)'}
  // const styleRight = {right: '-212px', transform: 'rotate(270deg)'}
  // const styleBottom = {bottom: '0px'}
  const styleTop = {top: '0px', transform: 'translate(-50%, 0%) rotate(180deg)', zIndex: 0}
  const styleLeft = {left: '0px', top: '50%', transform: 'translate(-0%, -50%) rotate(90deg)', zIndex: 0}
  const styleRight = {right: '0px', top: '50%', transform: 'translate(0%, -50%) rotate(270deg)', zIndex: 0}
  const styleBottom = {bottom: '0px', transform: 'translate(-50%, 0%)', zIndex: 0}

  const isMe = indexMe === index
  const myCards = cards.slice(indexMe*8, (indexMe+1)*8)

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

  const clickShowAnnonce = () => {
    setShowAnnonce(true)
  }

  useEffect(() => {
    if (canRelance) {
      const points = pointsDebut(myCards)
      if (points <= 10 && myCards.length > 0)
        setShowRelance(true)
      else
        setShowRelance(false)
    }
  }, [myCards])

  useEffect(() => {
    if (lastAnnoncePlayerIndex % 2 !== indexMe % 2 && lastAnnonce !== '') {
      setShowCoinche(true)
    }
  }, [lastAnnoncePlayerIndex, lastAnnonce])


  // speed dial button
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const actions = [
    { icon: <VisibilityIcon color='secondary' />, name: 'Annonce', onClick: clickShowAnnonce, show: (turnPlayer === indexMe && !showRelance && !showCoinche) },
    { icon: <ReplayIcon color='secondary' />, name: 'Relance', onClick: () => setDisplayRelance(true), show: (showRelance && lastAnnonce === '') },
    { icon: <DoDisturbIcon color='secondary' />, name: 'Coinche', onClick: () => setDisplayCoinche(true), show: (lastAnnonce !== '' && (lastAnnoncePlayerIndex%2) !== (indexMe%2) && showCoinche) },
    { icon: <RadarIcon color='secondary' />, name: 'Scores', onClick: () => setOpenScores(true), show: true },
    { icon: <InfoOutlineIcon color='secondary' />, name: 'Règles', onClick: () => {}, show: true },
  ];

  return (
    <div>
      
    {indexMe === index && 
      <Backdrop open={open} sx={{zIndex: 1, pointerEvents: 'none'}} />}

      <div style={getUsedStyle(index)} className={classes.mains}>
        
        {/* {index === indexMe &&
          <Tooltip title="Scores">
            <IconButton className={classes.buttonDernierPli} color="secondary" onClick={() => setOpenScores(true)}>
              <RadarIcon />
            </IconButton>
          </Tooltip>
        } */}

        {/* {index === indexMe && turnPlayer === indexMe && !showRelance && !showCoinche &&
          <Tooltip title="Annoncer">
            <IconButton className={classes.buttonDernierPli} color="secondary" onClick={clickShowAnnonce}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        } */}
        {/* {index === indexMe && showRelance && lastAnnonce === '' &&
          <Tooltip title="Relancer">
            <IconButton className={classes.buttonDernierPli} color="secondary" onClick={() => setDisplayRelance(true)}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        } */}
        {/* {indexMe === index && lastAnnonce !== '' && (lastAnnoncePlayerIndex%2) !== (indexMe%2) && showCoinche &&
          <Tooltip title="Coincher">
            <IconButton className={classes.buttonDernierPli} color="secondary" onClick={() => setDisplayCoinche(true)}>
              <DoDisturbIcon />
            </IconButton>
          </Tooltip>
        } */}
        <div className={index === turnPlayer ? classes.colorPlayer : classes.noColorPlayer}>
          <div className={classes.textMain}>
            <div className={classes.nameMain}>
              {index === partance && <Brightness1Icon color='secondary' />}
              <Typography color={isMe ? 'success' : 'error'} className={classes.namePlayer} variant="h5"><b>{player}</b></Typography>
            </div>
            <Typography><b>{annonceAll[index]}</b></Typography>
          </div>
          <div>
            {myCards.map((card, index) => (
              <Button key={index} className={classes.buttonCards} disabled>
                <img src={isMe ? `/Cartes/${card}.png` : cardBack} className={classes.imgCard} />
              </Button>
            ))}
          </div>
          <AnnonceDialog 
            open={turnPlayer === indexMe && indexMe === index && openAnnonce && showAnnonce && !showRelance && !showCoinche} 
            turnPlayer={turnPlayer} 
            setTurnPlayer={setTurnPlayer} 
            annonceAll={annonceAll}
            setAnnonceAll={setAnnonceAll}
            indexPlayer={indexMe}
            setLastAnnonce={setLastAnnonce}
            setLastAnnoncePlayerIndex={setLastAnnoncePlayerIndex}
            nbPasses={nbPasses}
            setNbPasses={setNbPasses}
            setShowAnnonce={setShowAnnonce}
            // setShowCoinche={setShowCoinche}
            lastMise={lastMise}
            setLastMise={setLastMise}
          />
          <RelanceDialog 
            open={indexMe === index && showRelance && lastAnnonce === '' && displayRelance}
            setOpen={setShowRelance}
            setCanRelance={setCanRelance}
            setRelanceGame={setRelanceGame}
            setDisplayRelance={setDisplayRelance}
          />
          <CoincheDialog
            open={indexMe === index && lastAnnonce !== '' && (lastAnnoncePlayerIndex%2) !== (indexMe%2) && showCoinche && displayCoinche}
            setOpen={setShowCoinche}
            lastAnnonce={lastAnnonce}
            setCoinched={setCoinche}
            setDisplayCoinche={setDisplayCoinche}
            // setCanCoinche={setCanCoinche}
            annonceAll={annonceAll}
            setAnnonceAll={setAnnonceAll}
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
        </div>
        {indexMe === index &&
          <Portal>
            <SpeedDial
              icon={<SpeedDialIcon />}
              ariaLabel="Actions du jeu"      // obligatoire ou ça plante (me demandez pas pourquoi)
              sx={{ position: 'fixed', bottom: 16, left: '70%', zIndex: 2}}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
              // FabProps={{
              //   className: classes.speedDial
              // }}
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
                      sx: {
                        maxWidth: 'none',  
                        width: '300px !important', 
                      }
                    },
                  }}
                />
              ))}
            </SpeedDial>
          </Portal>}
        {/* {index === indexMe &&
          <Tooltip title="Règles">
            <IconButton className={classes.buttonDernierPli} color="secondary">
              <InfoOutlineIcon />
            </IconButton>
          </Tooltip>
        } */}
      </div>
    </div>
  )
}

export default Main;
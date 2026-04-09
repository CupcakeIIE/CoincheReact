import { Backdrop, Button, IconButton, Portal, setRef, SpeedDial, SpeedDialAction, SpeedDialIcon, Tooltip, Typography, useMediaQuery } from "@mui/material";
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
import { getComplementaryColor, pointsDebut } from "./Coinche";
import CoincheDialog from "./CoincheDialog";
import ScoreDialog from "./ScoreDialog";
import ReglesDialog from "./ReglesDialog";

const Main = ({
  indexMe = 0, 
  player= '', 
  photo = '',
  color = '#87fdff',
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
  setNbManchesBis,
  players = [],
  manchesPoints = [],
  manchesTeamWin = [],
}) => {

  const classes = useStyles()

  const matches = useMediaQuery('(min-height:600px)');

  const [showAnnonce, setShowAnnonce] = useState(true)

  const [showRelance, setShowRelance] = useState(false)
  const [canRelance, setCanRelance] = useState(true)
  const [displayRelance, setDisplayRelance] = useState(true)

  const [showCoinche, setShowCoinche] = useState(false)
  const [displayCoinche, setDisplayCoinche] = useState(true)
  // const [canCoinche, setCanCoinche] = useState(true)

  const [openScores, setOpenScores] = useState(false)
  const [openRegles, setOpenRegles] = useState(false)

  const cardBack = './Cartes/card_back.png'

  // see for -212px => strange should be universal for all kind of screens
  // const styleTop = {top: '0px', transform: 'rotate(180deg)'}
  // const styleLeft = {left: '0px', transform: 'translate(-0%, 200%) rotate(90deg)'}
  // const styleLeft = {left: '-212px', transform: 'rotate(90deg)'}
  // const styleRight = {right: '0px', transform: 'translate(-0%, 200%) rotate(270deg)'}
  // const styleRight = {right: '-212px', transform: 'rotate(270deg)'}
  // const styleBottom = {bottom: '0px'}
  const styleTop = {top: '0px', zIndex: 0}
  const styleLeft = {left: '0px', zIndex: 0}
  const styleRight = {right: '0px', zIndex: 0}
  const styleBottom = {bottom: '0px', zIndex: 0}

  const styleTopBis = {transform: 'translate(-0%, 50%) rotate(180deg)'}
  const styleLeftBis = {transform: 'translate(15%, -0%) rotate(90deg)'}
  const styleLeftBisTel = {transform: 'translate(14%, -0%) rotate(90deg)'}
  const styleRightBis = {transform: 'translate(-15%, 0%) rotate(270deg)'}
  const styleRightBisTel = {transform: 'translate(-14%, 0%) rotate(270deg)'}
  const styleBottomBis = {transform: 'translate(-0%, -50%)',}

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
  const getUsedStyleBis = (index) => {
    const i = (index - indexMe + 4) % 4;
    if (i === 0)
      return styleBottomBis
    else if (i === 1 && matches)
      return styleLeftBis
    else if (i === 1)
      return styleLeftBisTel
    else if (i === 2)
      return styleTopBis
    else if (i === 3 && matches)
      return styleRightBis
    else if (i === 3)
      return styleRightBisTel
  }

  const clickShowAnnonce = () => {
    setShowAnnonce(true)
  }

  useEffect(() => {
    if (canRelance && lastAnnonce === '') {
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
    else
      setShowCoinche(false)

    if (lastAnnonce !== '')
      setShowRelance(false)
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
    { icon: <InfoOutlineIcon color='secondary' />, name: 'Règles', onClick: () => setOpenRegles(true), show: true },
  ];

  // console.log('min height 600px', matches)

  return (
    <div>
      
    {indexMe === index && 
      <Backdrop open={open} sx={{zIndex: 1, pointerEvents: 'none'}} />}

      <div style={getUsedStyle(index)} className={classes.mains}>
        <div style={getUsedStyleBis(index)} className={classes.mains}>
          
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
          <div className={index === turnPlayer ? classes.colorPlayer : classes.noColorPlayer} style={{backgroundColor: (index === turnPlayer && color), width: `${(matches || isMe) ? '600px' : '300px'}`, minHeight: '75px'}}>
            <div className={classes.textMain} style={{flexDirection: `${(matches || isMe) ? 'row' : 'column'}`}}>
              <div className={classes.nameMain}>
                {index === partance && <Brightness1Icon color='secondary' />}
                <div>
                  <img src={photo} width={(matches || isMe) ? '50px' : '30px'} />
                </div>
                <Typography /* color={isMe ? 'success' : 'error'} */ style={{color: (index === indexMe ? (index === turnPlayer ? getComplementaryColor(color) : color) : '#000')}} className={classes.namePlayer} variant={(matches || isMe) ? 'h5' : 'body1'}><b>{player}</b></Typography>
              </div>
              {(matches || isMe)
                ? <Typography><b>{annonceAll[index]}</b></Typography>
                : <Typography><i>{annonceAll[index]}</i></Typography>
              }
            </div>
            <div>
              {(matches || isMe) && myCards.map((card, index) => (
                <Button key={index} className={classes.buttonCards} disabled /* style={{width: `${matches ? '70px' : '5px'}`, height: `${matches ? '100px' : '80px'}`}} */>
                  <img src={isMe ? `./Cartes/${card}.png` : cardBack} className={classes.imgCard} />
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
              nbManches={nbManches}
              setNbManchesBis={setNbManchesBis}
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
            <ReglesDialog
              open={index === indexMe && openRegles}
              setOpen={setOpenRegles}
            />
          </div>
          {indexMe === index &&
            <Portal>
              <SpeedDial
                icon={<SpeedDialIcon />}
                ariaLabel="Actions du jeu"      // obligatoire ou ça plante (me demandez pas pourquoi)
                sx={{ position: 'fixed', bottom: 16, left: `${matches ? '71%' : '83%'}`, zIndex: 2}}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                FabProps={{
                  sx: { zIndex: 2,
                    '&:focus': {
                        outline: 'none',
                      }
                    },
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
                      },
                      staticTooltipLabel: {
                        sx: {
                            width: '120px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        },
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
    </div>
  )
}

export default Main;
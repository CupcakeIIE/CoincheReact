import { Button, IconButton, setRef, Typography } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ReplayIcon from '@mui/icons-material/Replay';

import useStyles from "./style";
import AnnonceDialog from "./AnnonceDialog";
import { useEffect, useState } from "react";
import RelanceDialog from "./RelanceDialog";
import { pointsDebut } from "./Coinche";

const Main = ({
  indexMe = 0, 
  player= '', 
  index = 0, 
  cards = [], 
  annonceAll = [], setAnnonceAll, 
  turnPlayer = 0, setTurnPlayer, 
  openAnnonce = false,
  lastAnnonce = '', setLastAnnonce,
  setLastAnnoncePlayerIndex,
  nbPasses = 0, setNbPasses,
  partance = 0,
  setRelanceGame,
}) => {

  const classes = useStyles()

  const [showAnnonce, setShowAnnonce] = useState(true)
  const [showRelance, setShowRelance] = useState(false)
  const [canRelance, setCanRelance] = useState(true)
  const [displayRelance, setDisplayRelance] = useState(true)

  const cardBack = '/Cartes/card_back.png'

  // see for -212px => strange should be universal for all kind of screens
  const styleTop = {top: '0px', transform: 'rotate(180deg)'}
  const styleLeft = {left: '-212px', transform: 'rotate(90deg)'}
  const styleRight = {right: '-212px', transform: 'rotate(270deg)'}
  const styleBottom = {bottom: '0px'}

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
      if (points <= 40 && myCards.length > 0)
        setShowRelance(true)
      else
        setShowRelance(false)
    }
  }, [myCards])


  return (
    <div style={getUsedStyle(index)} className={classes.mains}>
      
      {index === indexMe && turnPlayer === indexMe && !showRelance &&
        <IconButton className={classes.buttonDernierPli} color="secondary" onClick={clickShowAnnonce}>
          <VisibilityIcon />
        </IconButton>
      }
      {index === indexMe && showRelance &&
        <IconButton className={classes.buttonDernierPli} color="secondary" onClick={() => setDisplayRelance(true)}>
          <ReplayIcon />
        </IconButton>
      }
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
          open={turnPlayer === indexMe && indexMe === index && openAnnonce && showAnnonce && !showRelance} 
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
        />
        <RelanceDialog 
          open={indexMe === index && showRelance && lastAnnonce === '' && displayRelance}
          setOpen={setShowRelance}
          setCanRelance={setCanRelance}
          setRelanceGame={setRelanceGame}
          setDisplayRelance={setDisplayRelance}
        />
      </div>
      {index === indexMe &&
        <IconButton className={classes.buttonDernierPli} color="secondary">
          <InfoOutlineIcon />
        </IconButton>
      }
    </div>
  )
}

export default Main;
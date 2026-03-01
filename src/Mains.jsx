import { Button, Typography } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';

import useStyles from "./style";
import AnnonceDialog from "./AnnonceDialog";

const Main = ({
  indexMe = 0, 
  player= '', 
  index = 0, 
  cards = [], 
  annonceAll = [], setAnnonceAll, 
  turnPlayer = 0, setTurnPlayer, 
  openAnnonce = false,
  setLastAnnonce,
  setLastAnnoncePlayerIndex,
  nbPasses = 0, setNbPasses,
}) => {

  const classes = useStyles()

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

  return (
    <div style={getUsedStyle(index)} className={index === turnPlayer ? classes.mainsEnCours : classes.mains}>
      <div className={classes.textMain}>
        <div className={classes.nameMain}>
          {index === turnPlayer && <Brightness1Icon color='secondary' />}
          <Typography color={isMe ? 'success' : 'error'} className={classes.namePlayer} variant="h5"><b>{player}</b></Typography>
        </div>
        <Typography><b>{annonceAll[index]}</b></Typography>
      </div>
      <div>
        {myCards.map((card, index) => (
          <Button key={index} className={classes.buttonCards}>
            <img src={isMe ? `/Cartes/${card}.png` : cardBack} className={classes.imgCard} />
          </Button>
        ))}
      </div>
      <AnnonceDialog 
        open={turnPlayer === indexMe && indexMe === index && openAnnonce} 
        turnPlayer={turnPlayer} 
        setTurnPlayer={setTurnPlayer} 
        annonceAll={annonceAll}
        setAnnonceAll={setAnnonceAll}
        indexPlayer={indexMe}
        setLastAnnonce={setLastAnnonce}
        setLastAnnoncePlayerIndex={setLastAnnoncePlayerIndex}
        nbPasses={nbPasses}
        setNbPasses={setNbPasses}
      />
    </div>
  )
}

export default Main;
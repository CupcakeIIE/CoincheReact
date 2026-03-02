import { Button, Typography } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';

import useStyles from "./style";

const MainInGame = ({
  indexMe = 0, 
  player= '', 
  index = 0, 
  cards = [], setCards,
  annonceAll = [],
  turnPlayer = 0, setTurnPlayer, 
  cardsPlayed = [], setCardsPlayed,
}) => {

  const classes = useStyles()

  const cardBack = '/Cartes/card_back.png'

  // see for -212px => strange should be universal for all kind of screens
  const styleTop = {top: '0px', transform: 'translate(-50%, 0%) rotate(180deg)'}
  const styleLeft = {left: '0px', top: '50%', transform: 'translate(-36%, -50%) rotate(90deg)'}
  const styleRight = {right: '0px', top: '50%', transform: 'translate(36%, -50%) rotate(270deg)'}
  const styleBottom = {bottom: '0px', transform: 'translate(-50%, 0%)'}

  const isMe = indexMe === index
  const myCards = cards.slice(index*8, (index+1)*8)

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
    setCardsPlayed(cardsPlayed.map((c, i) => {
      if (i === turnPlayer)
        return card
      else 
        return c
    }))
    setCards(cards.map((c, i) => {
      if (i === indexCarte + indexMe*8)
        return ''
      else return c
    }))
    setTurnPlayer((turnPlayer+1) % 4)
  }


  const styleTopCard = {top: '50%', left: '50%', transform: 'translate(-50%, -150%) rotate(180deg)'}
  const styleLeftCard = {left: '50%', top:' 50%', transform: 'translate(-200%, -50%) rotate(90deg)'}
  const styleRightCard = {right: '50%', top: '50%', transform: 'translate(200%, -50%) rotate(270deg)'}
  const styleBottomCard = {bottom: '50%', left: '50%', transform: 'translate(-50%, 150%'}  
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

  return (
    <div>
      {/* afficher au centre les cartes jouées pour ce pli */}
      {index === indexMe &&
        cardsPlayed.map((carte, i) => (
          <div className={classes.boxCarte} style={getUsedStyleInGame(i)}>
            {carte && <img src={`/Cartes/${carte}.png`} className={classes.imgCard} />}
          </div>
      ))}

      <div style={getUsedStyle(index)} className={index === turnPlayer ? classes.mainsEnCours : classes.mains}>
        <div className={classes.textMain}>
          <div className={classes.nameMain}>
            {index === turnPlayer && <Brightness1Icon color='secondary' />}
            <Typography color={isMe ? 'success' : 'error'} className={classes.namePlayer} variant="h5"><b>{player}</b></Typography>
          </div>
          <Typography><b>{annonceAll[index]}</b></Typography>
        </div>
        <div>
          {myCards.map((card, i) => (
            <Button 
            key={i} 
            className={classes.buttonCards} 
            disabled={indexMe !== index || indexMe !== turnPlayer}
            onClick={() => clickCard(card, i)}
            >
              {card && <img src={isMe ? `/Cartes/${card}.png` : cardBack} className={classes.imgCard} />}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainInGame;
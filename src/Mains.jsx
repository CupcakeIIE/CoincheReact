import { Button, Typography } from "@mui/material";
import useStyles from "./style";

const Main = ({indexMe = 0, player= '', index = 0, cards = []}) => {

  const classes = useStyles()

  const cardBack = '/Cartes/card_back.png'

  // see for -212px => strange should be universal for all kind of screens
  const styleTop = {top: '0px', transform: 'rotate(180deg)', position: 'absolute'}
  const styleLeft = {left: '-205px', transform: 'rotate(90deg)', position: 'absolute'}
  const styleRight = {right: '-205px', transform: 'rotate(270deg)', position: 'absolute'}
  const styleBottom = {bottom: '0px', position: 'absolute'}

  const isMe = indexMe === index
  const myCards = cards.slice(indexMe*8, (indexMe+1)*8)
  console.log('myCards', myCards)

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
    <div style={getUsedStyle(index)}>
      <div className={classes.textMain}>
        <Typography color={isMe ? 'success' : 'error'} className={classes.namePlayer} variant="h5"><b>{player}</b></Typography>
        <Typography><b>110 Coeur</b></Typography>
      </div>
      <div>
        {myCards.map((card, index) => (
          <Button key={index} className={classes.buttonCards}>
            <img src={isMe ? `/Cartes/${card}.png` : cardBack} className={classes.imgCard} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Main;
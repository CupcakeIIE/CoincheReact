import { Button, Typography } from "@mui/material";
import useStyles from "./style";

const Coinche = ({indexMe = false, player= '', index = 0}) => {

  const classes = useStyles()

  // see for -212px => strange should be universal for all kind of screens
  const styleTop = {top: '0px', transform: 'rotate(180deg)', position: 'absolute'}
  const styleLeft = {left: '-212px', transform: 'rotate(90deg)', position: 'absolute'}
  const styleRight = {right: '-212px', transform: 'rotate(270deg)', position: 'absolute'}
  const styleBottom = {bottom: '0px', position: 'absolute'}

  const isMe = indexMe === index

  // cartes
  const cards = [
    "/Cartes/Coeur7.png",
    "/Cartes/Coeur8.png",
    "/Cartes/Coeur9.png",
    "/Cartes/Coeur10.png",
    "/Cartes/CoeurValet.png",
    "/Cartes/CoeurDame.png",
    "/Cartes/CoeurRoi.png",
    "/Cartes/CoeurAs.png",
  ]

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
      <Typography color={isMe ? 'success' : 'error'}>{player}</Typography>
      <div>
        {cards.map((card, index) => (
          <Button key={index} className={classes.buttonCards}>
            <img src={card} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Coinche;
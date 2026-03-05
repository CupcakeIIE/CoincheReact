import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import useStyles from "./style";

const DernierPliDialog = ({
  openDernierPli = false, 
  setOpenDernierPli, 
  cardsDernierPli = [], 
  dernierPliWinningCard = '', 
  indexJoueur = 0,
}) => {

  const classes = useStyles()

  const clickRevenirJeu = () => {
    setOpenDernierPli(false)
  }
  
  const styleTopCard = {top: '50%', left: '50%', transform: 'translate(-50%, -150%) rotate(180deg)'}
  const styleLeftCard = {left: '50%', top:' 50%', transform: 'translate(-200%, -50%) rotate(90deg)'}
  const styleRightCard = {right: '50%', top: '50%', transform: 'translate(200%, -50%) rotate(270deg)'}
  const styleBottomCard = {bottom: '50%', left: '50%', transform: 'translate(-50%, 150%'}  
  const getUsedStyleInGame = (index) => {
    const i = (index - indexJoueur + 4) % 4;
    if (i === 0)
      return styleBottomCard
    else if (i === 1)
      return styleLeftCard
    else if (i === 2)
      return styleTopCard
    else if (i === 3)
      return styleRightCard
  }

  console.log('winning card', dernierPliWinningCard)

  return (
    <Dialog open={openDernierPli} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Dernier Pli</DialogTitle>
      <DialogContent className={classes.dialogContentDernierPli}>
        {cardsDernierPli.map((carte, i) => (
          <div className={classes.boxCarte} style={getUsedStyleInGame(i)}>
            {carte && <img src={`/Cartes/${carte}.png`} className={classes.imgCard} />}
            {carte && carte === dernierPliWinningCard && <div className={classes.cardOverlayDernierPli}></div>}
          </div>
        ))}
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button 
          className={classes.buttonDialogBis} 
          color='secondary' 
          variant='outlined' 
          onClick={clickRevenirJeu}
        >
          Revenir au jeu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DernierPliDialog;
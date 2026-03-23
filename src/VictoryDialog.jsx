import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStyles from "./style";

const VictoryDialog = ({
  win = false, 
  open = false,
  setOpenWinDialog,
  annoncePlayerIndex = 0, 
  players = [], 
  annonce = '', 
  pointsPlayer = [], 
  nbManches = 0, setNbManches,
  // setResetGame,  
  okNextGame = [], setOkNextGame,
  indexPlayer = 0,
}) => {

  const classes = useStyles()

  const onClickOk = () => {
    // setNbManches(nbManches + 1, {reliable: true})
    // setResetGame(true, {reliable: true})
    // setOpenWinDialog(false)
    setOkNextGame(okNextGame.map((a, index) => {
      if (index === indexPlayer)
        return true
      else
        return a
    }))
  }

  // console.log('pointsPlayer', pointsPlayer)

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>
        {win ? 'Victoire' : 'Défaite'}
      </DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        <Typography>{`L'équipe de ${players[annoncePlayerIndex]?.state?.profile?.name} et ${players[(annoncePlayerIndex + 2) % 4]?.state?.profile?.name} a fait ${pointsPlayer[(annoncePlayerIndex + 2) % 4] + pointsPlayer[annoncePlayerIndex]} points`}</Typography>
        <Typography>{`${annonce} ${win ? 'a donc été fait' : "n'a donc pas été fait"}`}</Typography>
        <Typography><b>{win ? 'Victoire !' : 'Défaite...'}</b></Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={onClickOk}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default VictoryDialog;
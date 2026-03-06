import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStyles from "./style";

const VictoryDialog = ({win = false, open = false, annoncePlayerIndex = 0, players = [], annonce = '', pointsPlayer = []}) => {

  const classes = useStyles()

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>
        {win ? 'Victoire' : 'Défaite'}
      </DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        <Typography>{`L'équipe de ${players[annoncePlayerIndex]?.state?.profile?.name} et ${players[(annoncePlayerIndex + 2) % 4]?.state?.profile?.name} a fait ${pointsPlayer[(annoncePlayerIndex + 2) % 4] + pointsPlayer[annoncePlayerIndex]}`}</Typography>
        <Typography>{`${annonce} ${win ? 'a donc été fait' : "n'a donc pas ét fait"}`}</Typography>
        <Typography><b>{win ? 'Victoire !' : 'Défaite...'}</b></Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined'>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default VictoryDialog;
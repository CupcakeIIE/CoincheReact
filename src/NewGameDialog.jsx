import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import useStyles from "./style";

const NewGameDialog = ({open = false, newGameDecision = [], setNewGameDecision, indexPlayer = 0}) => {

  const classes = useStyles()

  const clickDecisionYes = () => {
    setNewGameDecision(newGameDecision.map((d, index) => {
      if (index === indexPlayer)
        return true
      else
        return d
    }), {reliable: true})
  }

  const clickDecisionNo = () => {
    setNewGameDecision(newGameDecision.map((d, index) => {
      if (index === indexPlayer)
        return false
      else
        return d
    }), {reliable: true})
  }

  // console.log('open new game dialog', open)

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Nouvelle partie</DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        Souhaitez-vous effectuer une nouvelle partie ?
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickDecisionYes}>Oui</Button>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickDecisionNo}>Non</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewGameDialog;
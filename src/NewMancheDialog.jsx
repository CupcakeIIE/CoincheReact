import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import useStyles from "./style"

const NewMancheDialog = ({open = false, indexMe = 0, setOpenNewMancheDialog, openNewMancheDialog = [], raison = ''}) => {

  const classes = useStyles()

  const clickOk = () => {
    setOpenNewMancheDialog(openNewMancheDialog.map((o, index) => {
      if (index === indexMe)
        return false
      else
        return o
    }))
  }

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Nouvelle manche</DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        Une nouvelle manche va commencer {raison !== '' && `(${raison})`}
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickOk}>C'est parti !</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewMancheDialog
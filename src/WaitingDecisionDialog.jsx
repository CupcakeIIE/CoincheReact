import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import useStyles from "./style"

const WaitingDecisionDialog = ({open = false}) => {

  const classes = useStyles()

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Attente</DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        En attente de la décision des autres joueurs...
      </DialogContent>
    </Dialog>
  )
}

export default WaitingDecisionDialog
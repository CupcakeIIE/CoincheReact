import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import useStyles from "./style"

const WaitDialog = ({open = false}) => {

  const classes = useStyles()

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Attente</DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        Attente des autres joueurs pour lancer la prochaine manche...
      </DialogContent>
    </Dialog>
  )
}

export default WaitDialog
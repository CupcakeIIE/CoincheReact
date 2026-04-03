import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import useStyles from "./style";
import { useEffect } from "react";

const BeloteDialog = ({
  open = false, 
  setShowBelote,
  pointsPlayer = [],
  setPointsPlayer = [],
  indexPlayer = 0,
  setBeloteRefus,
  setBeloteDialogOpen,
}) => {

  const classes = useStyles()

  // useEffect(() => {
  //   if (open)
  //     setBeloteDialogOpen(true, {reliable: true})
  //   else
  //     setBeloteDialogOpen(false, {reliable: true})
  // }, [open])

  const clickDecisionYes = () => {
    setShowBelote(true)
    setPointsPlayer(pointsPlayer.map((p, index) => {
      if (index === indexPlayer)
        return p + 20
      else
        return p
    }))
  }

  const clickDecisionNo = () => {
    setShowBelote(false)
    setBeloteRefus(true)
  }

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Belote</DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        Souhaitez-vous annoncer la belote et re ?
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickDecisionYes}>Oui</Button>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickDecisionNo}>Non</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BeloteDialog;
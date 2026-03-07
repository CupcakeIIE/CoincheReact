import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import useStyles from "./style";

const RelanceDialog = ({
  open = false,
  setOpen, 
  setCanRelance, 
  setRelanceGame,
  setDisplayRelance,
}) => {

  const classes = useStyles()

  const clickNo = () => {
    setOpen(false)
    setCanRelance(false)
  }

  const clickYes = () => {
    setOpen(false)
    setRelanceGame(true)
  }

  const clickHidingRelance = () => {
    setDisplayRelance(false)
  }
  
  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4'>Relance</Typography>
        <IconButton className={classes.iconButton} onClick={clickHidingRelance}>
          <VisibilityOffIcon className={classes.visibility} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        <Typography>Vous avez moins de 10 points</Typography>
        <Typography>Souhaitez-vous relancer ?</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickYes}>Oui</Button>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickNo}>Non</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RelanceDialog;
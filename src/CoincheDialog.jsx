import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useStyles from "./style"

const CoincheDialog = ({
  open = false, 
  setOpen, 
  setCoinched, 
  lastAnnonce = '', 
  setDisplayCoinche,
  annonceAll = [],
  setAnnonceAll,
  indexPlayer = 0,
}) => {

  const classes = useStyles()

  const clickHidingCoinche = () => {
    setDisplayCoinche(false)
  }

  const clickYes = () => {
    setOpen(false)
    setCoinched(true, {reliable: true})
    setAnnonceAll(
      annonceAll.map((a, index) => {
        if (index === indexPlayer)
          return`Coinche`
        else
          return a
      }),
    {reliable: true})
  }

  const clickNo = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4'>Coinche</Typography>
        <IconButton className={classes.iconButton} onClick={clickHidingCoinche}>
          <VisibilityOffIcon className={classes.visibility} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        <Typography>L'équipe adverse a annoncé <b>{lastAnnonce}</b></Typography>
        <Typography>Souhaitez-vous coincher ?</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickYes}>Oui</Button>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickNo}>Non</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CoincheDialog
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import useStyles from "./style";
import { useState } from "react";

const AnnonceDialog = ({
  open = false/* , setOpen */, 
  annonceAll = [], setAnnonceAll, 
  indexPlayer = 0, 
  turnPlayer = 0, setTurnPlayer,
  setLastAnnonce,
  setLastAnnoncePlayerIndex,
  nbPasses = 0, setNbPasses,
}) => {

  const classes = useStyles()

  const [couleur, setCouleur] = useState('')
  const [mise, setMise] = useState('')

  const allCouleurs = ['Carreau', 'Coeur', 'Pique', 'Trèfle']
  const allMises = ['80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', 'Capot', 'Générale']

  const chooseColor = (colorSelected) => {
    setCouleur(colorSelected)
  }

  const chooseMise = (miseSelected) => {
    setMise(miseSelected)
  }

  const choosePass = () => {
    setAnnonceAll(
      annonceAll.map((a, index) => {
        if (index === indexPlayer)
          return 'Passe'
        else
          return a
      })
    )
    setNbPasses(nbPasses + 1)
    setTurnPlayer((turnPlayer+1) % 4)
    // setOpen(false)
  }

  const chooseOK = () => {
    setAnnonceAll(
      annonceAll.map((a, index) => {
        if (index === indexPlayer)
          return`${mise} ${couleur}`
        else
          return a
      })
    )
    setLastAnnonce(`${mise} ${couleur}`)
    setLastAnnoncePlayerIndex(indexPlayer)
    setNbPasses(0)
    setTurnPlayer((turnPlayer+1) % 4)
    // setOpen(false)
  }

  return (
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4'>Annonce</Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.buttonsBlock}>
          {allCouleurs.map((color, index) => (
            <Button 
              key={index} 
              color='secondary' 
              className={classes.buttonChoice} 
              variant={couleur === color ? 'contained' : 'outlined'}
              onClick={() => chooseColor(color)}
            >
              {color}
            </Button>
          ))}
        </div>
        <Divider orientation="vertical" variant="middle" flexItem className={classes.divider} />
        <div>
          <div className={classes.buttonsBlockNombres}>
            {allMises.slice(0, 11).map((valeur, index) => (
              <Button 
                key={index} 
                color='secondary' 
                className={classes.buttonChoiceNumber} 
                variant={valeur === mise ? 'contained' : 'outlined'}
                onClick={() => chooseMise(valeur)}
              >
                {valeur}
              </Button>
            ))}
          </div>
          <div className={classes.buttonsBlockNombres}>
            {allMises.slice(11).map((valeur, index) => (
              <Button 
                key={index} 
                color='secondary' 
                className={classes.buttonChoice} 
                variant={valeur === mise ? 'contained' : 'outlined'}
                onClick={() => chooseMise(valeur)}
              >
                {valeur}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button 
          color="secondary" 
          className={classes.buttonDialog} 
          variant='outlined'
          onClick={choosePass}
        >
          Passer
        </Button>
        <Button 
          color="secondary" 
          className={classes.buttonDialog} 
          variant='outlined' 
          disabled={couleur === '' || mise === ''}
          onClick={chooseOK}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AnnonceDialog;
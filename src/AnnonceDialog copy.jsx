import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import useStyles from "./style";
import { useState } from "react";

const AnnonceDialog = ({open = false/* , setOpen */, annonceAll = [], setAnnonceAll, indexPlayer = 0, turnPlayer = 0, setTurnPlayer}) => {

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
    setTurnPlayer((turnPlayer+1) % 4)
    // setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle className={classes.dialogTitle}>Annonce</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.buttonsBlock}>
          {allCouleurs.map((color, index) => (
            <Button 
              key={index} 
              color='secondary' 
              className={classes.buttonChoice} 
              variant={couleur === color ? 'contained' : 'text'}
              onClick={() => chooseColor(color)}
            >
              {color}
            </Button>
          ))}
        </div>
        <div className={classes.buttonsBlockNombres}>
          {allMises.map((valeur, index) => (
            <Button 
              key={index} 
              color='secondary' 
              className={classes.buttonChoice} 
              variant={valeur === mise ? 'contained' : 'text'}
              onClick={() => chooseMise(valeur)}
            >
              {valeur}
            </Button>
          ))}
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
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs } from "@mui/material";
import useStyles from "./style";

const ReglesDialog = ({open = false, setOpen}) => {

  const classes = useStyles()

  const [value, setValue] = useState('regles')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Dialog open={open} className={classes.wholeDialogRegles}>
      <DialogTitle className={classes.dialogTitle}>Règles</DialogTitle>
      <DialogContent className={classes.dialogContentRegles}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          sx={{
            '& .MuiTab-root:focus': {
              outline: 'none',
            },
          }}
        >
          <Tab value="regles" label="Règles" />
          <Tab value="points" label="Points" />
          <Tab value="contact" label="Contact" />
        </Tabs>
        {value === 'regles' &&
          <div className={classes.regles}>
            <ul>
              <li>Quand un capot est annoncé, cela signifie que l'équipe qui a misé prévoit de faire tous les plis sans exceptions.</li>
              <li>Quand une générale est annoncée, cela signifie que la personne qui a misé prévoit de faire tous les plis sans exceptions.</li>
              <li>Si vous n'avez pas de la couleur demandé, vous devez couper. Sauf dans le cas où votre partenaire est maître.</li>
              <li>Quand de l'atout est joué, vous êtes obligé de monter si vous avez un atout plus haut.</li>
              <li>Si un joueur possède le Roi et la Dame d'atout (ne compte pas pour l'annonce Tout Atout), il peut annoncer la belote et la re-belote en jouant ces cartes. Cela ajoutera automatiquement 20 points à son équipe.</li>
            </ul>
          </div>
        }
        {value === 'points' &&
          <div className={classes.reglesPoints}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'><b>Ordre</b></TableCell>
                  <TableCell align='center'><b>Non - Atout</b></TableCell>
                  <TableCell align='center'><b>Sans Atout</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'><b>As</b></TableCell>
                  <TableCell align='center'>11</TableCell>
                  <TableCell align='center'>19</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>10</b></TableCell>
                  <TableCell align='center'>10</TableCell>
                  <TableCell align='center'>10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>Roi</b></TableCell>
                  <TableCell align='center'>4</TableCell>
                  <TableCell align='center'>4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>Dame</b></TableCell>
                  <TableCell align='center'>3</TableCell>
                  <TableCell align='center'>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>Valet</b></TableCell>
                  <TableCell align='center'>2</TableCell>
                  <TableCell align='center'>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>9</b></TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell align='center'>0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>8</b></TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell align='center'>0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>7</b></TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell align='center'>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'><b>Ordre</b></TableCell>
                  <TableCell align='center'><b>Atout</b></TableCell>
                  <TableCell align='center'><b>Tout Atout</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'><b>Valet</b></TableCell>
                  <TableCell align='center'>20</TableCell>
                  <TableCell align='center'>14</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>9</b></TableCell>
                  <TableCell align='center'>14</TableCell>
                  <TableCell align='center'>9</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align='center'><b>As</b></TableCell>
                  <TableCell align='center'>11</TableCell>
                  <TableCell align='center'>6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>10</b></TableCell>
                  <TableCell align='center'>10</TableCell>
                  <TableCell align='center'>5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>Roi</b></TableCell>
                  <TableCell align='center'>4</TableCell>
                  <TableCell align='center'>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>Dame</b></TableCell>
                  <TableCell align='center'>3</TableCell>
                  <TableCell align='center'>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>8</b></TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell align='center'>0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><b>7</b></TableCell>
                  <TableCell align='center'>0</TableCell>
                  <TableCell align='center'>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        }
        {value === 'contact' &&
          <div className={classes.regles}>
            En cas de bugs, questions, suggestions, veuillez contacter <b><i>cupcake0665</i></b> via Discord avec une explication détaillée de la requête et si possible d'une capture d'écran explicative.
            <br/>
            Amusez vous bien !
          </div>
        }
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialogBis} variant='outlined' onClick={() => setOpen(false)}>Revenir au jeu</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReglesDialog;
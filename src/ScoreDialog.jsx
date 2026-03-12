import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import useStyles from "./style"

const ScoreDialog = ({
  open = false, 
  setOpen,
  
  // for scores dialog
  nbManches = 0,
  players = [],
  manchesPoints = [],
  manchesTeamWin = [],
}) => {

  const classes = useStyles()

  const clickOkButton = () => {
    setOpen(false)
  }

  console.log('scores', manchesPoints, manchesTeamWin)

  const totalTeam1 = nbManches === 0 
    ? '-' 
    : manchesPoints.reduce((acc, m, index) => {
        if (manchesTeamWin[index] === 0)
          return acc + m
        else
          return acc
      }, 0)
  
  const totalTeam2 = nbManches === 0 
    ? '-'
    : manchesPoints.reduce((acc, m, index) => {
        if (manchesTeamWin[index] === 1)
          return acc + m
        else
          return acc
      }, 0)

  return(
    <Dialog open={open} className={classes.wholeDialog}>
      <DialogTitle className={classes.dialogTitle}>Scores</DialogTitle>
      <DialogContent className={classes.dialogContentVictory}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell></TableCell>
              <TableCell align="center">
                <div>
                  <Typography>{players[0]?.state?.profile?.name}</Typography>
                  <Typography>{players[2]?.state?.profile?.name}</Typography>
                </div>
              </TableCell>
              <TableCell align="center">
                <div>
                  <Typography>{players[1]?.state?.profile?.name}</Typography>
                  <Typography>{players[3]?.state?.profile?.name}</Typography>
                </div>
              </TableCell>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell align="center">Manche 1</TableCell>
                <TableCell align="center">{manchesTeamWin === 0 ? manchesPoints : '-'}</TableCell>
                <TableCell align="center">{manchesTeamWin === 1 ? manchesPoints : '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Manche 2</TableCell>
                <TableCell align="center">{manchesTeamWin === 0 ? manchesPoints : '-'}</TableCell>
                <TableCell align="center">{manchesTeamWin === 1 ? manchesPoints : '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Manche 3</TableCell>
                <TableCell align="center">{manchesTeamWin === 0 ? manchesPoints : '-'}</TableCell>
                <TableCell align="center">{manchesTeamWin === 1 ? manchesPoints : '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Manche 4</TableCell>
                <TableCell align="center">{manchesTeamWin === 0 ? manchesPoints : '-'}</TableCell>
                <TableCell align="center">{manchesTeamWin === 1 ? manchesPoints : '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">{totalTeam1}</TableCell>
                <TableCell align="center">{totalTeam2}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions className={classes.dialogActionsBis}>
        <Button color="secondary" className={classes.buttonDialog} variant='outlined' onClick={clickOkButton}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ScoreDialog
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  gameBoard: {
    // position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },

  buttonCards: {
    "&:focus": {
      outline: "none",
    },
    padding: '0px',
  },
}));

export default useStyles;
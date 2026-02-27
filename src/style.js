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
    padding: '0px !important',
    width: '70px',
    height: '100px',
  },

  imgCard: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  namePlayer: {
    // display: 'flex',
    // paddingLeft: '2em',
    // justifyContent: 'flex-start',
  },

  textMain: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.5em 2em',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
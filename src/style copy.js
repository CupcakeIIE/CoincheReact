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

  dialogTitle: {
    backgroundColor: '#9500ae',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDialog: {
    '&:focus': {
      outline: 'none',
    },
    "&:hover": {
      borderColor: '#9500ae',
    },
  },

  nameMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
  },

  buttonChoice: {
    '&:focus': {
      outline: 'none',
    },
    paddingLeft: '1em !important',
    paddingRight: '1em !important',
    marginLeft: '1em !important',
    marginRight: '1em !important',
  },

  dialogActions: {
    // backgroundColor: '#9500ae',
    borderTop: '1px solid #9500ae',
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
  },

  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2em 2em !important',
    flexDirection: 'column',
  },

  buttonsBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  buttonsBlockNombres: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: '1em',
  },
}));

export default useStyles;
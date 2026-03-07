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

  iconButton: {
    "&:focus": {
      outline: "none",
    },
    right: '5%',
    position: 'absolute !important',
    border: '1px solid #fff !important',
  },

  visibility: {
    color: '#fff',
  },

  cardOverlay: {
    width: '100%',
    height: '100%',
    inset: '0',
    position: 'absolute',
    backgroundColor: 'rgba(89, 0, 255, 0.18)',
  },

  cardOverlayDernierPli: {
    width: '100%',
    height: '100%',
    inset: '0',
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 0, 0.22)',
  },

  boxCarte: {
    position: 'absolute',
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
    position: 'relative',
  },

  buttonDialog: {
    '&:focus': {
      outline: 'none',
    },
    "&:hover": {
      borderColor: '#9500ae',
    },
    backgroundColor: '#fff !important',
    width: '130px',
    borderRadius: '30px !important',
    // paddingTop: '1em !important',
    // paddingBottom: '1em !important'
  },

  buttonDialogBis: {
    '&:focus': {
      outline: 'none',
    },
    "&:hover": {
      borderColor: '#9500ae',
    },
    backgroundColor: '#fff !important',
    width: '160px',
    borderRadius: '30px !important',
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
    "&:hover": {
      borderColor: '#9500ae',
    },
    paddingLeft: '1em !important',
    paddingRight: '1em !important',
    margin: '0.5em 0.5em !important',
    width: '150px',
  },

  buttonChoiceNumber: {
    '&:focus': {
      outline: 'none',
    },
    "&:hover": {
      borderColor: '#9500ae',
    },
    paddingLeft: '1em !important',
    paddingRight: '1em !important',
    margin: '0.5em 1em !important',
    width: '50px',
  },

  dialogActions: {
    backgroundColor: '#9500ae',
    borderTop: '1px solid #9500ae',
    display: 'flex !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important',
    padding: '1em 10em !important',
    // paddingRight: '10em !important',
  },

  dialogActionsBis: {
    backgroundColor: '#9500ae',
    borderTop: '1px solid #9500ae',
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    padding: '1em 10em !important',
    // paddingRight: '10em !important',
  },

  dialogContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2em 2em !important',
    flexDirection: 'column',
    maxWidth: '60em !important',
  },

  dialogContentDernierPli: {
    minHeight: '23em !important',
    minWidth: '35em !important',
  },

  dialogContentBis: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '2em 2em !important',
    // paddingTop: '1em',
    flexDirection: 'row',
    maxWidth: '60em !important',
  },

  buttonsBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginRight: '1.3em !important',
    marginLeft: '1em !important',
  },

  buttonsBlockNombres: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    // paddingTop: '1em',
    // flexDirection: 'column',
  },

  dividerHorizontal: {
    backgroundColor: '#9500ae',
    width: '80%',
    // marginTop: '1em',
    // marginLeft: '1em !important',
  },

  annonceEnnemie: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1em',
    marginBottom: '1em',  
  },

  divider: {
    backgroundColor: '#9500ae',
    paddingTop: '2em',
    // marginLeft: '1em !important',
  },

  wholeDialog: {
    "& .MuiPaper-root": {
      borderRadius: '30px !important',
      maxWidth: '655px',
    }
  },

  mains: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    gap: '2em',
    justifyContent: 'center',
    alignItems: 'center',
  },

  colorPlayer: {
    backgroundColor: '#87fdff',
    borderTopLeftRadius: '30px !important',
    borderTopRightRadius: '30px !important',
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingTop: '1em',
  },

  noColorPlayer: {
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingTop: '1em',
  },

  buttonDernierPli: {
    height: '2em',
    width: '2em',
    '&:focus': {
      outline: 'none',
    },
    "&:hover": {
      borderColor: '#9500ae',
    },
    border: '1px solid #9500ae !important',
    marginTop: '3em !important',
  },

  dialogContentVictory: {
    padding: '2em !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export default useStyles;
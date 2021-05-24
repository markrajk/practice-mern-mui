import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 4, 0),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  header: {
    paddingBottom: theme.spacing(3),
    width: '100%',
  },
  headerTitle: {
    marginBottom: theme.spacing(4),
    fontSize: '2em',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',

    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  person: {
    width: '10em',
    margin: theme.spacing(0, 2, 2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginBottom: theme.spacing(1),
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  modalFooter: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalHeader: {
    marginBottom: theme.spacing(4),
  },
  modalHeaderTitle: {
    marginBottom: theme.spacing(2),
    fontSize: '1.5em',
    fontWeight: '600',
  },
  categoryModalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > *': {
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
}))

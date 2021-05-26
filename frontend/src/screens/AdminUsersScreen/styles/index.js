import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 4, 0, 4),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItens: 'flex-start',
    justifyContent: 'flex-start',
  },
  pageHeader: {
    display: 'flex',
    alignItens: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(3),
  },
  content: {
    width: '100%',
    // maxWidth: '80%',
  },
  tableContainer: {
    maxHeight: 440,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,

    '& #simple-modal-title': {
      marginBottom: theme.spacing(2),
    },
  },
  modalResults: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    '& > *': {
      margin: theme.spacing(0, 1, 1, 0),
    },
  },

  modalFooter: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
}))

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
    width: '100%',
  },
  headerTitle: {
    marginBottom: theme.spacing(2),
    fontSize: '2em',
    fontWeight: '600',
  },
  headerBottom: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  body: {
    flex: 1,
    width: '100%',
    paddingTop: theme.spacing(4),
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',

    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  accordion: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    padding: theme.spacing(4, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
}))

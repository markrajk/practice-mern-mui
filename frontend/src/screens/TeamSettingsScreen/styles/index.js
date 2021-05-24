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
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(3, 0, 3, 0),
  },
  footerButton: {
    marginLeft: theme.spacing(1),
  },
}))

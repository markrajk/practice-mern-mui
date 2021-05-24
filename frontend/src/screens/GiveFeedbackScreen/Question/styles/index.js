import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    '& > *': {
      minWidth: '100%',
    },
  },
  question: {
    marginBottom: theme.spacing(3),
  },
  rating: {},

  star: {
    fontSize: '2em',
    cursor: 'pointer',
    color: 'grey',
  },

  starFilled: {
    fontSize: '2em',
    cursor: 'pointer',
    color: 'yellow',
  },
}))

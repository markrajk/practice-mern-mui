import { fade, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(5),
    boxShadow: theme.shadows[3],
  },
  form: {
    // marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    '& > *': {
      marginBottom: theme.spacing(3),
    },
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > *': {
      width: '49%',
    },
  },
}))

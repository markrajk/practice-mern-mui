import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({
  colors: {
    background: '#f9f9f9',
    black: '#2c3e50',
    white: '#fff',
    blue: '#0074D9',
    red: '#FF4136',
  },

  transition: '0.3s',
  border: '1px solid #ccc',
  boxShadow: `5px 5px 15px 5px #2c3e50`,
  borderRadius: '15px',
})

export const lightTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    type: 'light',
  },
})

export const darkTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    type: 'dark',
  },
})

export const greenTheme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: {
      light: '#48ea8c',
      main: '#2ecc71',
      dark: '11ad52',
      contrastText: '#fff',
    },
    secondary: {
      light: '//#region f29748',
      main: '#e67e22',
      dark: '#ce6910',
      contrastText: '#FFF',
    },
  },
})

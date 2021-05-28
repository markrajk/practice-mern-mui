import React from 'react'
// import { Container } from './styles'
import { Container } from '@material-ui/core'
import { useStyles } from './styles'

const Main = ({ children }) => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="lg">
      {children}
    </Container>
  )
}

export default Main

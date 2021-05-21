import React from 'react'
// import { Container } from './styles'
import { Container } from '@material-ui/core'

const Main = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      style={{
        paddingTop: '7.5em',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  )
}

export default Main

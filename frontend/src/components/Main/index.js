import React from 'react'
// import { Container } from './styles'
import { Container } from '@material-ui/core'

const Main = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      style={{
        paddingTop: '2.5em',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100% - 64px)',
      }}
    >
      {children}
    </Container>
  )
}

export default Main

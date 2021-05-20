import React from 'react'
import { Container } from './styles'
import BeatLoader from 'react-spinners/BeatLoader'

const Loader = ({ loading, css, color }) => {
  return (
    <Container>
      <BeatLoader color={color} loading={loading} size={15}></BeatLoader>
    </Container>
  )
}

export default Loader

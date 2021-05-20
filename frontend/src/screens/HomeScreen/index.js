import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    !userInfo && history.push('/login')
  }, [userInfo, history])

  return (
    <div>
      <h1>Home Screen</h1>
    </div>
  )
}

export default HomeScreen

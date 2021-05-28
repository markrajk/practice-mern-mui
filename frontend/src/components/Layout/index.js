import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../actions/userActions'
import Header from '../Header'
import Main from '../Main'
import MainDrawer from '../MainDrawer'
import { Paper } from '@material-ui/core'
import { useStyles } from './styles'
import { ThemeProvider } from '@material-ui/core/styles'
import { GlobalStyles, lightTheme, greenTheme } from '../../styles'

const Layout = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [usedTheme, setUsedTheme] = useState(lightTheme)
  const [teamId, setTeamId] = React.useState(
    localStorage.getItem('selectedTeam') || null
  )

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const gotUser = useSelector((state) => state.getUser)
  const { userInfo: gotUserInfo } = gotUser

  const updateUserSettings = useSelector((state) => state.updateUserSettings)
  const { userInfo: updatedUserInfo } = updateUserSettings

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const handleTeamChange = (event) => {
    setTeamId(event.target.value)
    localStorage.setItem('selectedTeam', event.target.value)
  }

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.settings.theme) {
        case 'green':
          return setUsedTheme(greenTheme)
        default:
          return setUsedTheme(lightTheme)
      }
    }
  }, [updatedUserInfo, userInfo])

  useEffect(() => {
    if (userInfo) {
      dispatch(getUser(userInfo._id))
      setTeamId(localStorage.getItem('selectedTeam') || null)
    }
  }, [dispatch, userInfo])

  return (
    <ThemeProvider theme={usedTheme}>
      <GlobalStyles />
      <Paper className={classes.root}>
        <Header
          drawerOpen={handleDrawerOpen}
          drawerClose={handleDrawerClose}
          drawerToggle={handleDrawerToggle}
          open={open}
        />
        {userInfo && (
          <>
            <MainDrawer
              userInfo={userInfo}
              user={gotUserInfo}
              team={teamId}
              teamChange={handleTeamChange}
              drawerOpen={handleDrawerOpen}
              drawerClose={handleDrawerClose}
              drawerToggle={handleDrawerToggle}
              open={open}
            />
          </>
        )}
        <Main>{children}</Main>
      </Paper>
    </ThemeProvider>
  )
}

export default Layout

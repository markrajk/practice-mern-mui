import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, getUser } from '../../actions/userActions'
import {} from '../../actions/teamActions'
import clsx from 'clsx'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PeopleIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { useTheme } from '@material-ui/core/styles'

import { useStyles } from './styles'

const Header = ({ history }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const [teamId, setTeamId] = React.useState('')

  const handleTeamChange = (event) => {
    setTeamId(event.target.value)
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const gotUser = useSelector((state) => state.getUser)
  const { userInfo: gotUserInfo } = gotUser

  const createdTeam = useSelector((state) => state.createTeam)
  const { success: createTeamSuccess } = createdTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success: updateTeamSuccess } = updatedTeam

  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose()
    history.push('/')
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!gotUserInfo && userInfo) {
      dispatch(getUser(userInfo._id))
    }
  }, [createTeamSuccess, updateTeamSuccess, dispatch, userInfo, gotUserInfo])

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        onClick={(e) => history.push(`/users/${userInfo._id}`)}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const mainDrawer = (
    <Drawer
      history={history}
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select team</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={teamId}
            onChange={handleTeamChange}
          >
            {gotUserInfo &&
              [
                ...gotUserInfo.owner,
                ...gotUserInfo.admin,
                ...gotUserInfo.member,
              ].map((team) => (
                <MenuItem key={team._id} value={team._id}>
                  {team.name}
                </MenuItem>
              ))}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            {gotUser && []}
          </Select>
        </FormControl>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {teamId && (
        <List>
          <ListItem button onClick={(e) => history.push(`/teams/${teamId}`)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Team members" />
          </ListItem>

          <ListItem
            button
            onClick={(e) => history.push(`/teams/${teamId}/settings`)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Team settings" />
          </ListItem>

          <ListItem
            button
            onClick={(e) => history.push(`/teams/${teamId}/charts`)}
          >
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Team charts" />
          </ListItem>

          <ListItem
            button
            onClick={(e) => history.push(`/teams/${teamId}/feedback`)}
          >
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Team feedback" />
          </ListItem>
        </List>
      )}
      <Divider />
      <div className={classes.drawerFooter}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => history.push('/createTeam')}
        >
          Create new team
        </Button>
      </div>
    </Drawer>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/">Practice App</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          {userInfo && (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {mainDrawer}

      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

export default Header

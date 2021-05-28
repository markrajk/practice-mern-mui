import React from 'react'
import clsx from 'clsx'
import {
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import { isOwnerOrAdminUser } from '../../utils/helperFunctions'
import { useTheme } from '@material-ui/core/styles'
import { useStyles } from './styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PeopleIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import FeedbackIcon from '@material-ui/icons/Feedback'
import SendIcon from '@material-ui/icons/Send'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { withRouter } from 'react-router'

const MainDrawer = ({
  userInfo,
  history,
  open,
  drawerClose,
  user,
  team,
  teamChange,
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleTeamChange = (event) => {
    teamChange(event)
  }

  const handleDrawerClose = () => {
    drawerClose()
  }

  const handleLinkClick = (value) => {
    history.push(value)
    handleDrawerClose()
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      {open && (
        <div className={classes.drawerHeader}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={team}
              onChange={handleTeamChange}
            >
              {user &&
                [...user.owner, ...user.admin, ...user.member].map((team) => (
                  <MenuItem key={team._id} value={team._id}>
                    {team.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      )}

      <Divider />
      {team && (
        <List>
          <ListItem button onClick={(e) => handleLinkClick(`/teams/${team}`)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Team members" />
          </ListItem>

          {isOwnerOrAdminUser(user, team) && (
            <>
              <ListItem
                button
                onClick={(e) => handleLinkClick(`/teams/${team}/settings`)}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Team settings" />
              </ListItem>

              <ListItem
                button
                onClick={(e) =>
                  handleLinkClick(`/teams/${team}/settings/feedback`)
                }
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback settings" />
              </ListItem>
            </>
          )}

          <ListItem
            button
            onClick={(e) => handleLinkClick(`/teams/${team}/charts`)}
          >
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Team charts" />
          </ListItem>

          <ListItem
            button
            onClick={(e) => handleLinkClick(`/teams/${team}/giveFeedback`)}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Give feedback" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={(e) => handleLinkClick(`/users/${userInfo._id}/settings`)}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="User settings" />
          </ListItem>
          {user && user.role === 'admin' && (
            <>
              <Divider />
              <ListItem
                button
                onClick={(e) => handleLinkClick(`/admins/users`)}
              >
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Manage users" />
              </ListItem>
              <ListItem
                button
                onClick={(e) => handleLinkClick(`/admins/questions`)}
              >
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Manage questions" />
              </ListItem>
            </>
          )}
          <Divider />
          {open && (
            <div className={classes.drawerFooter}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleLinkClick('/createTeam')}
              >
                Create new team
              </Button>
            </div>
          )}
        </List>
      )}
    </Drawer>
  )
}

export default withRouter(MainDrawer)

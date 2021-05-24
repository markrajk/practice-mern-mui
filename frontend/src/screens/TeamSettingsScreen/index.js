import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam, deleteTeam } from '../../actions/teamActions'
import { Paper, TextField, Typography, Button } from '@material-ui/core'
import { useStyles } from './styles'

const TeamSettingsScreen = ({ match, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [teamName, setTeamName] = useState('')

  const gotTeam = useSelector((state) => state.getTeam)
  const { team } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success: updateSuccess } = updatedTeam

  const deletedTeam = useSelector((state) => state.deleteTeam)
  const { success: deleteSuccess } = deletedTeam

  const handleTeamNameChange = (value) => {
    setTeamName(value)
  }

  const handleTeamUpdate = () => {
    if (teamName === '') {
      return window.alert('You have to make some changes first!')
    }
    if (window.confirm('Are you sure you want to update this team?')) {
      dispatch(updateTeam(match.params.id, { name: teamName }))
      setTeamName('')
    }
  }

  const handleTeamDelete = () => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      dispatch(deleteTeam(match.params.id))
      localStorage.removeItem('selectedTeam')
      history.push('/')
    }
  }

  useEffect(() => {
    dispatch(getTeam(match.params.id))
  }, [dispatch, match, updateSuccess, deleteSuccess])

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.header}>
        <Typography variant="p" className={classes.headerTitle}>
          Team settings
        </Typography>
      </div>
      <div className={classes.body}>
        {team && (
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              required
              id="filled-required"
              label="Team name"
              defaultValue={team.name}
              onChange={(e) => handleTeamNameChange(e.currentTarget.value)}
            />
          </form>
        )}
      </div>
      <div className={classes.footer}>
        <Button
          className={classes.footerButton}
          color="secondary"
          variant="contained"
          onClick={handleTeamDelete}
        >
          Delete
        </Button>
        <Button
          className={classes.footerButton}
          color="primary"
          variant="contained"
          onClick={handleTeamUpdate}
        >
          Save
        </Button>
      </div>
    </Paper>
  )
}

export default TeamSettingsScreen

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTeam, createDemoTeam } from '../../actions/teamActions'

import SearchBox from '../../components/SearchBox'
import { useStyles } from './styles'
import {
  Avatar,
  Chip,
  Card,
  Typography,
  TextField,
  Button,
  CardActions,
} from '@material-ui/core'

const CreateTeamScreen = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const createdDemoTeam = useSelector((state) => state.createDemoTeam)
  const { team: demoTeamCreated, success: demoTeamSuccess } = createdDemoTeam

  const createdTeam = useSelector((state) => state.createTeam)
  const { team: teamCreated, success } = createdTeam

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [team, setTeam] = useState({ name: '', members: [] })

  const handleAddUser = (user) => {
    if (
      team.members.some((el) => {
        return JSON.stringify(el) === JSON.stringify(user)
      }) ||
      userInfo._id === user._id
    )
      return
    setTeam({ ...team, members: [...team.members, user] })
  }

  const handleDeleteUser = (user) => {
    const updatedArr = team.members.filter((member) => member._id !== user._id)
    setTeam({ ...team, members: updatedArr })
  }

  const handleDemoTeamCreate = async () => {
    dispatch(createDemoTeam())
  }

  const handleTeamCreate = async (team) => {
    if (!team.name) return alert('Team must have name')

    const updatedArr = team.members.map((member) => member._id)
    // setTeam({ ...team, members: updatedArr })

    await dispatch(createTeam({ ...team, members: updatedArr }))
    // handleInvitation(teamCreated)
  }

  useEffect(() => {
    if (success && team && teamCreated) {
      history.push(`/teams/${teamCreated._id}`)
      console.log(teamCreated)
      // handleInvitation(teamCreated)
    }
  }, [success, history, team, teamCreated])

  useEffect(() => {
    if (demoTeamSuccess && demoTeamCreated) {
      history.push(`/teams/${demoTeamCreated._id}`)
    }
  }, [demoTeamSuccess, history, demoTeamCreated])

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardHeader}>
        <Typography variant="h4">Create new team</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDemoTeamCreate}
        >
          Create Demo
        </Button>
      </div>
      <TextField
        type="text"
        id="filled-full-width"
        label="Team name"
        fullWidth
        variant="outlined"
        onChange={(e) => setTeam({ ...team, name: e.currentTarget.value })}
      />

      <SearchBox team={team} addUser={handleAddUser} />

      <div className={classes.root}>
        {team &&
          team.members.map((member, index) => (
            <Chip
              size="large"
              className={classes.chip}
              avatar={
                <Avatar
                  alt={member.fullName}
                  src={`/img/users/${member.photoSm}`}
                />
              }
              label={member.fullName}
              onDelete={(e) => handleDeleteUser(member)}
              variant="outlined"
            />
          ))}
      </div>

      <div className={classes.cardFooter}>
        <Button
          variant="contained"
          size="large"
          color="danger"
          onClick={(e) => history.push('/')}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={(e) => handleTeamCreate(team)}
        >
          Create
        </Button>
      </div>
    </Card>
  )
}

export default CreateTeamScreen

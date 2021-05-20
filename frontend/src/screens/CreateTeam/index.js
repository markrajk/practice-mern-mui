import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTeam } from '../../actions/teamActions'

import SearchBox from '../../components/SearchBox'
import {
  Container,
  Title,
  SubTitle,
  Input,
  Label,
  ContentWrapper,
  Buttons,
  SubmitButton,
  CancelButton,
  Members,
  MemberItem,
  useStyles,
} from './styles'
import {
  Avatar,
  Chip,
  Card,
  Typography,
  TextField,
  Button,
  CardActions,
} from '@material-ui/core'
import BinIcon from '../../components/Icons/BinIcon'
import DoneIcon from '@material-ui/icons/Done'

const CreateTeamScreen = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

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

  return (
    <Card className={classes.card} variant="outlined">
      <Typography variant="h4">Create new team</Typography>
      <TextField
        type="text"
        id="filled-full-width"
        label="Team name"
        fullWidth
        variant="outlined"
        onChange={(e) => setTeam({ ...team, name: e.currentTarget.value })}
      />
      {/* <ContentWrapper>
        <Title>Create new team</Title>
        <SubTitle>Enter the fields bellow to create you team.</SubTitle>

        <Label htmlFor="team-name">Team name</Label>
        <Input
          type="text"
          id="team-name"
          onChange={(e) => setTeam({ ...team, name: e.currentTarget.value })}
        />

        <Label htmlFor="search-box">Team members</Label>
        
      </ContentWrapper> */}
      <SearchBox team={team} addUser={handleAddUser} />

      <div className={classes.root}>
        {team &&
          team.members.map((member, index) => (
            // <MemberItem key={member._id || index}>
            //   <p>{member.fullName}</p>
            //   <i onClick={(e) => handleDeleteUser(member)}>
            //     <BinIcon />
            //   </i>
            // </MemberItem>
            <>
              {console.log(member, 'TEST!!!!')}
              {/* <Chip
                key={member._id || index}
                avatar={<Avatar src={`/img/users/${member.photoSm}`} />}
                label={member.fullName}
                onClick={(e) => handleDeleteUser(member)}
                deleteIcon={<DoneIcon />}
              /> */}

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
              {/* <Chip
                avatar={
                  <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                }
                label="Deletable"
                onDelete={handleDeleteUser(member)}
              /> */}
              {/* <Chip label="Basic" /> */}
            </>
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

      {/* <ContentWrapper style={{ paddingTop: '3em', marginTop: 'auto' }}>
        <Buttons>
          <CancelButton onClick={(e) => history.push('/')}>Cancel</CancelButton>
          <SubmitButton onClick={(e) => handleTeamCreate(team)}>
            Create team
          </SubmitButton>
        </Buttons>
      </ContentWrapper> */}
    </Card>
  )
}

export default CreateTeamScreen

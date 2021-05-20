import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam, deleteTeam } from '../../actions/teamActions'
import { updateUser } from '../../actions/userActions'
import {
  createInvitation,
  deleteInvitation,
} from '../../actions/invitationActions'
import {
  Container,
  Content,
  Header,
  Title,
  Table,
  Editable,
  Button,
} from './styles'
import Modal from '../../components/Modal'
import SearchBox from '../../components/SearchBox'
import LeadPencilIcon from '../../components/Icons/LeadPencilIcon'
import BxsSaveIcon from '../../components/Icons/BxsSaveIcon'

const TeamScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const gotTeam = useSelector((state) => state.getTeam)
  const { team, error } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success, error: updateError } = updatedTeam

  const deletedTeam = useSelector((state) => state.deleteTeam)
  const { error: deleteError } = deletedTeam

  const updatedUser = useSelector((state) => state.updateUser)
  const { error: updateUserError, success: updateUserSuccess } = updatedUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [edit, setEdit] = useState(false)
  const [teamName, setTeamName] = useState('')

  const [editEach, setEditEach] = useState({})
  const [jobTitle, setJobTitle] = useState(null)

  const [openModal, setOpenModal] = useState(false)

  const rowElements = useRef([])

  const getRef = (element) => rowElements.current.push(element)

  const isAdmin = (team) => {
    if (team.admins.some((user) => user._id === userInfo._id)) return true
    return false
  }

  const isOwner = (team) => {
    if (team.owner._id === userInfo._id) return true
    return false
  }

  const handleAddUser = (user) => {
    if (
      team.members.some((el) => {
        return JSON.stringify(el) === JSON.stringify(user)
      }) ||
      userInfo._id === user._id
    )
      return

    const newArr = [...team.members, user].map((member) => member._id)

    handleUpdate(undefined, newArr)
  }

  const handleUserDelete = (e, id) => {
    if (e.currentTarget.disabled) return
    if (!window.confirm('Are you sure you want to delete this member')) return
    const newArr = team.members
      .map((member) => member._id)
      .filter((member) => member !== id)

    handleUpdate(undefined, newArr)
  }

  const handleTeamNameUpdate = (name) => {
    setTeamName(name)
    handleUpdate(teamName)
    setEdit(false)
  }

  const handleUpdate = (name, members) => {
    dispatch(updateTeam(match.params.id, { name, members }))
  }

  const deleteTeamHandler = () => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      dispatch(deleteTeam(match.params.id))
      history.push('/')
    }
  }

  const handleJobTitleEdit = (id) => {
    let strObj = `{`

    Array.from([...team.members, ...team.admins, team.owner]).forEach((e) => {
      if (e._id === id) {
        strObj += `"${e._id}": true,`
      } else {
        strObj += `"${e._id}": false,`
      }
    })

    strObj = strObj.substring(0, strObj.length - 1)
    strObj += '}'

    const newObj = JSON.parse(strObj)

    setEditEach(newObj)
    // setEditEach({ ...newObj, ...(editEach[`${id}`] = !newObj[`${id}`]) })
  }

  const updateJobTitle = (id) => {
    if (jobTitle === '') setJobTitle(undefined)
    dispatch(updateUser(id, { jobTitle: jobTitle }))
    handleJobTitleEdit(null)
  }

  // const setJobTitle = (role, value) => {}

  const [sort, setSort] = useState('')
  const [bool, setBool] = useState(true)

  const handleSort = (str) => {
    str === sort && setBool(!bool)
    setSort(str)
  }

  const usersArr = (team, sort, bool) => {
    const sortByRole = (a, b) => {
      const roleA = a.role.toUpperCase()
      const roleB = b.role.toUpperCase()

      if (roleA < roleB) {
        return bool ? -1 : 1
      }
      if (roleA > roleB) {
        return bool ? 1 : -1
      }

      // names must be equal
      return 0
    }

    const sortByName = (a, b) => {
      const roleA = a.fullName.toUpperCase()
      const roleB = b.fullName.toUpperCase()

      if (roleA < roleB) {
        return bool ? -1 : 1
      }
      if (roleA > roleB) {
        return bool ? 1 : -1
      }

      // names must be equal
      return 0
    }

    const sortByTitle = (a, b) => {
      const roleA = a.jobTitle ? a.jobTitle.toUpperCase() : 'zzzzzz'
      const roleB = b.jobTitle ? b.jobTitle.toUpperCase() : 'zzzzzz'

      if (roleA < roleB) {
        return bool ? -1 : 1
      }
      if (roleA > roleB) {
        return bool ? 1 : -1
      }

      // names must be equal
      return 0
    }

    team.members.forEach((member) => (member.role = 'Member'))
    team.admins.forEach((admin) => (admin.role = 'Admin'))
    team.owner.role = 'Owner'

    if (sort === 'role')
      return [
        team.owner,
        ...team.admins,
        ...team.members,
        ...team.invitations.map((inv) => {
          inv.receiver.pending = true
          inv.receiver.invitationId = inv._id
          return inv.receiver
        }),
      ].sort(sortByRole)
    if (sort === 'name')
      return [
        team.owner,
        ...team.admins,
        ...team.members,
        ...team.invitations.map((inv) => {
          inv.receiver.pending = true
          inv.receiver.invitationId = inv._id
          return inv.receiver
        }),
      ].sort(sortByName)
    if (sort === 'title')
      return [
        team.owner,
        ...team.admins,
        ...team.members,
        ...team.invitations.map((inv) => {
          inv.receiver.pending = true
          inv.receiver.invitationId = inv._id
          return inv.receiver
        }),
      ].sort(sortByTitle)
    return [
      team.owner,
      ...team.admins,
      ...team.members,
      ...team.invitations.map((inv) => {
        inv.receiver.pending = true
        inv.receiver.invitationId = inv._id
        return inv.receiver
      }),
    ]
  }

  const createdInvitation = useSelector((state) => state.createInvitation)
  const { success: invCreateSuccess } = createdInvitation

  const deletedInvitation = useSelector((state) => state.deleteInvitation)
  const { success: invDeleteSuccess } = deletedInvitation

  const handleInvitation = (user) => {
    dispatch(createInvitation(user._id, team._id))
    // team.members.forEach((member) => {
    //   console.log(team, member._id, team._id)
    //   dispatch(createInvitation(member, team._id))
    // })
  }

  const handleInvitationCancel = (id) => {
    dispatch(deleteInvitation(id))
  }

  useEffect(() => {
    dispatch(getTeam(match.params.id))

    // if (team) {
    //   team.members.forEach((member) => (member.role = 'member'))
    //   team.admins.forEach((admin) => (admin.role = 'admin'))
    //   team.owner.role = 'owner'

    //   return [team.owner, ...team.admins, ...team.members]
    // }
    // [team.owner, ...team.admins, ...team.members].map(member)

    error && alert(error)
    deleteError && alert(deleteError)
    updateError && alert(updateError)
    updateUserError && alert(updateUserError)
  }, [
    dispatch,
    match.params.id,
    success,
    error,
    deleteError,
    updateError,
    updateUserSuccess,
    updateUserError,
    invDeleteSuccess,
    invCreateSuccess,
  ])

  return (
    <>
      <Container>
        <Content>
          <Header>
            <Title>
              <Editable
                edit={edit}
                suppressContentEditableWarning
                onInput={(e) => setTeamName(e.target.textContent)}
              >
                {team && team.name}
              </Editable>
            </Title>
            {team && userInfo._id === team.owner._id && (
              <>
                {!edit ? (
                  <i onClick={() => setEdit(!edit)}>
                    <LeadPencilIcon />
                  </i>
                ) : (
                  <i onClick={() => handleTeamNameUpdate(teamName)}>
                    <BxsSaveIcon />
                  </i>
                )}
                <Button className="deny" onClick={deleteTeamHandler}>
                  Delete
                </Button>
              </>
            )}
          </Header>

          {team &&
            (isAdmin(team) ||
              (isOwner(team) && (
                <Button
                  style={{ marginBottom: '1em' }}
                  className="confirm"
                  onClick={(e) => setOpenModal(!openModal)}
                >
                  Invite members
                </Button>
              )))}

          {/* <button onClick={handleUpdate(team.name, teamMembers)}>Update</button> */}
          {team &&
            (team.members || team.admins) &&
            (team.members[0] || team.admins[0] || team.owner) && (
              <Table>
                <thead>
                  <tr>
                    <th onClick={(e) => handleSort('name')}>User</th>
                    <th onClick={(e) => handleSort('role')}>Role</th>
                    <th onClick={(e) => handleSort('title')}>Job Title</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {isAdmin(team) ||
                    (isOwner(team) && (
                      <tr className="input-row">
                        <td colSpan="5">
                          <SearchBox team={team} addUser={handleAddUser} />
                        </td>
                      </tr>
                    ))}
                  {usersArr(team, sort, bool).map((member, index, arr) => {
                    return (
                      <tr key={member._id} ref={getRef}>
                        <td>
                          <Link to={`/users/${member._id}`}>
                            {member.fullName}
                          </Link>
                        </td>
                        <td>{!member.pending ? member.role : 'Pending'}</td>
                        <td className="job-title">
                          {!member.pending ? (
                            <div>
                              <Editable
                                edit={editEach[`${member._id}`]}
                                suppressContentEditableWarning
                                onInput={(e) =>
                                  setJobTitle(e.target.textContent)
                                }
                              >
                                {member.jobTitle
                                  ? member.jobTitle
                                  : 'No job title'}
                              </Editable>

                              {isAdmin(team) ||
                                (isOwner(team) && (
                                  <>
                                    {!editEach[`${member._id}`] ? (
                                      <i
                                        className="edit"
                                        onClick={(e) =>
                                          handleJobTitleEdit(member._id)
                                        }
                                      >
                                        <LeadPencilIcon />
                                      </i>
                                    ) : (
                                      <i
                                        className="save"
                                        onClick={(e) =>
                                          updateJobTitle(member._id)
                                        }
                                      >
                                        <BxsSaveIcon />
                                      </i>
                                    )}
                                  </>
                                ))}
                            </div>
                          ) : (
                            <p>Pending</p>
                          )}
                        </td>
                        <td>
                          <p>{member.pending ? 'Pending' : 'Active'}</p>
                        </td>
                        <td>
                          {!member.pending ? (
                            <>
                              {member.role !== 'Owner' && (
                                <button
                                  disabled={
                                    !(
                                      team &&
                                      (userInfo._id === team.owner._id ||
                                        team.admins.includes(userInfo))
                                    )
                                  }
                                  className={
                                    team &&
                                    (userInfo._id === team.owner._id ||
                                      team.admins.includes(userInfo))
                                      ? 'delete'
                                      : ''
                                  }
                                  onClick={(e) =>
                                    handleUserDelete(e, member._id)
                                  }
                                >
                                  Delete
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              disabled={!(isAdmin(team) || isOwner(team))}
                              className={
                                isAdmin(team) || isOwner(team) ? 'delete' : ''
                              }
                              onClick={(e) =>
                                handleInvitationCancel(member.invitationId)
                              }
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            )}
        </Content>
      </Container>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title="Send Invitations"
        buttons={['cancel']}
      >
        <SearchBox invitational team={team} addUser={handleInvitation} />
      </Modal>
    </>
  )
}

export default TeamScreen

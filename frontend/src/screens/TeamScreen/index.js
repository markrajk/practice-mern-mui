import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam, deleteTeam } from '../../actions/teamActions'
import { updateUser } from '../../actions/userActions'
import {
  createInvitation,
  deleteInvitation,
} from '../../actions/invitationActions'
import { Editable, useStyles } from './styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Modal,
  Chip,
  Avatar,
} from '@material-ui/core'
import SearchBox from '../../components/SearchBox'

const TeamScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const [tempTeam, setTempTeam] = useState({})

  const gotTeam = useSelector((state) => state.getTeam)
  const { team, success: getTeamSuccess, error } = gotTeam

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

  const [userList, setUserList] = useState([])

  const handleAddUser = (user) => {
    // console.log(
    //   team.members.some((el) => {
    //     return JSON.stringify(el) === JSON.stringify(user)
    //   })
    // )
    // console.log(
    //   team.members.find((member) => member._id === user._id),
    //   user
    // )

    if (
      team.members.some((el) => {
        return el._id === user._id
      }) ||
      userInfo._id === user._id
    )
      return

    // if (
    //   team.members.some((el) => {
    //     return JSON.stringify(el) === JSON.stringify(user)
    //   }) ||
    //   userInfo._id === user._id
    // )
    //   return

    const newArr = [...userList, user]
    // const newArr = [...team.members, user].map((member) => member._id)

    setUserList(newArr)

    //handleUpdate(undefined, newArr)
  }

  const handleDeleteUser = (user) => {
    const updatedArr = userList.filter((member) => member._id !== user._id)
    setUserList(updatedArr)
  }

  const hadleModalClose = () => {
    setUserList([])
    setOpenModal(false)
  }

  const handleAddMembers = () => {
    const newArr = [...team.members, ...userList].map((member) => member._id)
    handleUpdate(undefined, newArr)
    dispatch(getTeam(match.params.id))
  }

  const handleUserDelete = (e, id) => {
    // window.alert(id)
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
    dispatch(getTeam(match.params.id))
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
  }

  const updateJobTitle = (id) => {
    if (jobTitle === '') setJobTitle(undefined)
    dispatch(updateUser(id, { jobTitle: jobTitle }))
    handleJobTitleEdit(null)
  }

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
  }

  const handleInvitationCancel = (id) => {
    dispatch(deleteInvitation(id))
  }

  // ************** TABLE DATA ******************/
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'role', label: 'Role', minWidth: 100 },
    {
      id: 'jobTitle',
      label: 'Job title',
      minWidth: 170,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
    },
    {
      id: 'button',
      label: '',
      minWidth: 170,
    },
  ]

  function createData(name, role, jobTitle, status, button, memberId) {
    return { name, role, jobTitle, status, button, memberId }
  }

  const [rows, setRows] = useState([])

  const classes = useStyles()
  //******************************************* */

  useEffect(() => {
    if (!team || match.params.id !== team._id) {
      dispatch(getTeam(match.params.id))
    } else {
      team.members.forEach((member) => (member.role = 'Member'))
      team.admins.forEach((admin) => (admin.role = 'Admin'))
      team.owner.role = 'Owner'
      setRows(
        [
          team.owner,
          ...team.admins,
          ...team.members,
          ...team.invitations.map((inv) => {
            inv.receiver.pending = true
            inv.receiver.invitationId = inv._id
            return inv.receiver
          }),
        ].map((member) =>
          createData(
            member.fullName,
            member.role,
            member.jobTitle || 'No job title yet',
            member.reveiver ? 'Pending' : 'Active',
            'button',
            member._id
          )
        )
      )

      setTempTeam(team)
    }

    error && alert(error)
    deleteError && alert(deleteError)
    updateError && alert(updateError)
    updateUserError && alert(updateUserError)
  }, [
    history,
    dispatch,
    match,
    success,
    error,
    deleteError,
    updateError,
    updateUserSuccess,
    updateUserError,
    invDeleteSuccess,
    invCreateSuccess,
    getTeamSuccess,
  ])

  return (
    <>
      <div className={classes.root}>
        <div className={classes.pageHeader}>
          <Typography variant="h4">{tempTeam.name}</Typography>
          <Button
            style={{ marginLeft: 'auto' }}
            size="large"
            variant="contained"
            color="primary"
            onClick={(e) => setOpenModal(true)}
          >
            Add new member
          </Button>
        </div>
        <Paper className={classes.content}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        switch (column.id) {
                          case 'jobTitle':
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={(e) =>
                                  handleJobTitleEdit(row.memberId)
                                }
                                onBlur={(e) => updateJobTitle(row.memberId)}
                              >
                                <Editable
                                  edit={editEach[`${row.memberId}`]}
                                  suppressContentEditableWarning
                                  onInput={(e) =>
                                    setJobTitle(e.target.textContent)
                                  }
                                >
                                  {value}
                                </Editable>
                              </TableCell>
                            )
                          case 'button':
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  disabled={
                                    !(isAdmin(tempTeam) || isOwner(tempTeam))
                                  }
                                  variant="contained"
                                  color="secondary"
                                  onClick={(e) =>
                                    handleUserDelete(e, row.memberId)
                                  }
                                >
                                  Delete
                                </Button>
                                {/* {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value} */}
                              </TableCell>
                            )
                          default:
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            )
                        }
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Modal
        open={openModal}
        onClose={hadleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Invite team members</h2>
          <SearchBox team={team} addUser={handleAddUser} />
          {/* <SimpleModal /> */}
          <div className={classes.modalResults}>
            {userList.map((member) => (
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
          <div className={classes.modalFooter}>
            <Button variant="contained" color="primary">
              Send invites
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMembers}
            >
              Add to team
            </Button>
          </div>
        </div>
      </Modal>
    </>
    // <>
    //   <Container>
    //     <Content>
    //       <Header>
    //         <Title>
    //           <Editable
    //             edit={edit}
    //             suppressContentEditableWarning
    //             onInput={(e) => setTeamName(e.target.textContent)}
    //           >
    //             {team && team.name}
    //           </Editable>
    //         </Title>
    //         {team && userInfo._id === team.owner._id && (
    //           <>
    //             {!edit ? (
    //               <i onClick={() => setEdit(!edit)}>
    //                 <LeadPencilIcon />
    //               </i>
    //             ) : (
    //               <i onClick={() => handleTeamNameUpdate(teamName)}>
    //                 <BxsSaveIcon />
    //               </i>
    //             )}
    //             <Button className="deny" onClick={deleteTeamHandler}>
    //               Delete
    //             </Button>
    //           </>
    //         )}
    //       </Header>

    //       {team &&
    //         (isAdmin(team) ||
    //           (isOwner(team) && (
    //             <Button
    //               style={{ marginBottom: '1em' }}
    //               className="confirm"
    //               onClick={(e) => setOpenModal(!openModal)}
    //             >
    //               Invite members
    //             </Button>
    //           )))}

    //       {/* <button onClick={handleUpdate(team.name, teamMembers)}>Update</button> */}
    //       {team &&
    //         (team.members || team.admins) &&
    //         (team.members[0] || team.admins[0] || team.owner) && (
    //           <Table>
    //             <thead>
    //               <tr>
    //                 <th onClick={(e) => handleSort('name')}>User</th>
    //                 <th onClick={(e) => handleSort('role')}>Role</th>
    //                 <th onClick={(e) => handleSort('title')}>Job Title</th>
    //                 <th>Status</th>
    //                 <th></th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {isAdmin(team) ||
    //                 (isOwner(team) && (
    //                   <tr className="input-row">
    //                     <td colSpan="5">
    //                       <SearchBox team={team} addUser={handleAddUser} />
    //                     </td>
    //                   </tr>
    //                 ))}
    //               {usersArr(team, sort, bool).map((member, index, arr) => {
    //                 return (
    //                   <tr key={member._id} ref={getRef}>
    //                     <td>
    //                       <Link to={`/users/${member._id}`}>
    //                         {member.fullName}
    //                       </Link>
    //                     </td>
    //                     <td>{!member.pending ? member.role : 'Pending'}</td>
    //                     <td className="job-title">
    //                       {!member.pending ? (
    //                         <div>
    // <Editable
    //   edit={editEach[`${member._id}`]}
    //   suppressContentEditableWarning
    //   onInput={(e) =>
    //     setJobTitle(e.target.textContent)
    //   }
    // >
    //   {member.jobTitle
    //     ? member.jobTitle
    //     : 'No job title'}
    // </Editable>

    //                           {isAdmin(team) ||
    //                             (isOwner(team) && (
    //                               <>
    //                                 {!editEach[`${member._id}`] ? (
    //                                   <i
    //                                     className="edit"
    //                                     onClick={(e) =>
    //                                       handleJobTitleEdit(member._id)@@@@@
    //                                     }
    //                                   >
    //                                     <LeadPencilIcon />
    //                                   </i>
    //                                 ) : (
    //                                   <i
    //                                     className="save"
    //                                     onClick={(e) =>
    //                                       updateJobTitle(member._id)
    //                                     }
    //                                   >
    //                                     <BxsSaveIcon />
    //                                   </i>
    //                                 )}
    //                               </>
    //                             ))}
    //                         </div>
    //                       ) : (
    //                         <p>Pending</p>
    //                       )}
    //                     </td>
    //                     <td>
    //                       <p>{member.pending ? 'Pending' : 'Active'}</p>
    //                     </td>
    //                     <td>
    //                       {!member.pending ? (
    //                         <>
    //                           {member.role !== 'Owner' && (
    //                             <button
    //                               disabled={
    //                                 !(
    //                                   team &&
    //                                   (userInfo._id === team.owner._id ||
    //                                     team.admins.includes(userInfo))
    //                                 )
    //                               }
    //                               className={
    //                                 team &&
    //                                 (userInfo._id === team.owner._id ||
    //                                   team.admins.includes(userInfo))
    //                                   ? 'delete'
    //                                   : ''
    //                               }
    //                               onClick={(e) =>
    //                                 handleUserDelete(e, member._id)
    //                               }
    //                             >
    //                               Delete
    //                             </button>
    //                           )}
    //                         </>
    //                       ) : (
    //                         <button
    //                           disabled={!(isAdmin(team) || isOwner(team))}
    //                           className={
    //                             isAdmin(team) || isOwner(team) ? 'delete' : ''
    //                           }
    //                           onClick={(e) =>
    //                             handleInvitationCancel(member.invitationId)
    //                           }
    //                         >
    //                           Cancel
    //                         </button>
    //                       )}
    //                     </td>
    //                   </tr>
    //                 )
    //               })}
    //             </tbody>
    //           </Table>
    //         )}
    //     </Content>
    //   </Container>
    //   <Modal
    //     open={openModal}
    //     setOpen={setOpenModal}
    //     title="Send Invitations"
    //     buttons={['cancel']}
    //   >
    //     <SearchBox invitational team={team} addUser={handleInvitation} />
    //   </Modal>
    // </>
  )
}

export default TeamScreen

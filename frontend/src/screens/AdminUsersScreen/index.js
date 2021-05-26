import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  adminGetAllUsers,
  adminUpdateUser,
  adminDeleteUser,
} from '../../actions/adminActions'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'

const AdminUsersScreen = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [rows, setRows] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminAllUsers = useSelector((state) => state.adminGetAllUsers)
  const { users } = adminAllUsers

  const adminUpdatedUser = useSelector((state) => state.adminUpdateUser)
  const { success: adminUserUpdateSuccess } = adminUpdatedUser

  const adminDeletedUser = useSelector((state) => state.adminDeleteUser)
  const { success: adminUserDeleteSuccess } = adminDeletedUser

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
      id: 'role',
      label: 'Role',
      minWidth: 170,
    },
    {
      id: 'promote',
      label: 'Promote',
      minWidth: 170,
    },
    {
      id: 'demote',
      label: 'Demote',
      minWidth: 170,
    },
    {
      id: 'remove',
      label: 'Delete',
      minWidth: 170,
    },
  ]

  const createData = (name, role, promote, demote, remove, user) => {
    return { name, role, promote, demote, remove, user }
  }

  const handlePromote = (id) => {
    dispatch(adminUpdateUser(id, { role: 'admin' }))
  }

  const handleDemote = (id) => {
    dispatch(adminUpdateUser(id, { role: 'user' }))
  }

  const handleDelete = (id) => {
    dispatch(adminDeleteUser(id))
  }

  useEffect(() => {
    if (userInfo.role !== 'admin') {
      history.push('/')
    } else {
      dispatch(adminGetAllUsers())
    }
  }, [
    dispatch,
    adminUserUpdateSuccess,
    adminUserDeleteSuccess,
    history,
    userInfo,
  ])

  useEffect(() => {
    if (users) {
      setRows(
        users.map((user) =>
          createData(
            user.fullName,
            user.role,
            'promote',
            'demote',
            'remove',
            user
          )
        )
      )
    }
  }, [users])

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.pageHeader}>
        <Typography variant="h4">Admin User Control</Typography>
      </div>
      <Paper className={classes.tableContainer}>
        <TableContainer className={classes.container}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      switch (column.id) {
                        case 'promote':
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="primary"
                                disabled={
                                  userInfo._id === row.user._id ||
                                  row.user.role === 'admin'
                                }
                                onClick={(e) => handlePromote(row.user._id)}
                              >
                                {value}
                              </Button>
                            </TableCell>
                          )
                        case 'demote':
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="primary"
                                disabled={
                                  userInfo._id === row.user._id ||
                                  row.user.role !== 'admin'
                                }
                                onClick={(e) => handleDemote(row.user._id)}
                              >
                                {value}
                              </Button>
                            </TableCell>
                          )
                        case 'remove':
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="secondary"
                                disabled={row.user.role === 'admin'}
                                onClick={(e) => handleDelete(row.user._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          )
                        default:
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
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
    </Paper>
  )
}

export default AdminUsersScreen

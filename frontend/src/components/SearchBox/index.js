import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/userActions'
// import { Container, Input, Results, ResultsItem } from './styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'

const SearchBox = ({ team, addUser, invitational }) => {
  const dispatch = useDispatch()

  const allUsers = useSelector((state) => state.getAllUser)
  const { users, loading } = allUsers

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [searchFocus, setSearchFocus] = useState(false)

  const handleChange = (event, queryStr) => {
    dispatch(getAllUsers(queryStr))
  }

  const handleAddUser = (event, user) => {
    console.log(user)
    user && addUser(user)
  }

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  //const loading = open && options.length === 0

  useEffect(() => {
    // console.log(users)
    if (!users) {
      dispatch(getAllUsers(''))
    } else {
      console.log(users)
      console.log(team)
      team.admins = team.admins || []
      team.members = team.members || []
      const newArr = users
        .map((user) => {
          if (
            ![team.owner, ...team.admins, ...team.members].find(
              (member) => member && member._id === user._id
            )
          ) {
            return user
          } else {
            return undefined
          }
        })
        .filter((filter) => filter)
      console.log(newArr, 'NEW ARR')
      setOptions(newArr)
      // console.log([team.owner, team.admins && ...team.admins, ...team.members], 'TEAM')
      console.log(users, 'USERS')
    }
  }, [dispatch, users, team])

  return (
    <Autocomplete
      style={{ width: '100%' }}
      onChange={handleAddUser}
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => option.fullName === value.fullName}
      getOptionLabel={(option) => option.fullName}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select team members"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    // <Container>
    //   <Input
    //     id="search-box"
    //     type="text"
    //     onChange={(e) => handleChange(e.currentTarget.value)}
    //     // onBlur={(e) => setSearchFocus(false)}
    //     onFocus={(e) => setSearchFocus(true)}
    //     autoComplete="off"
    //   />
    //   {team && users && users[0] && searchFocus && (
    //     <Results>
    //       {users.map((user) => {
    //         if (
    //           (team.invitations &&
    //             team.invitations.some(
    //               (inv) => inv.receiver._id === user._id
    //             )) ||
    //           (team.members &&
    //             team.members.some((member) => member._id === user._id)) ||
    //           (team.admins &&
    //             team.admins.some((admin) => admin._id === user._id)) ||
    //           (userInfo && userInfo._id === user._id) ||
    //           (team.owner && team.owner._id === user._id)
    //         ) {
    //         } else {
    //           return (
    //             <>
    //               <ResultsItem key={user._id}>
    //                 <p>
    //                   {user.firstName} {user.lastName}
    //                 </p>
    //                 <button onClick={(e) => handleAddUser(user)}>
    //                   {invitational ? 'Send' : 'Add'}
    //                 </button>
    //               </ResultsItem>
    //             </>
    //           )
    //         }
    //       })}
    //     </Results>
    //   )}
    // </Container>
  )
}

Comment.propTypes = {
  addUser: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  invitational: PropTypes.bool,
}

export default SearchBox

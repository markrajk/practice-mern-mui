import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/userActions'
import { Container, Input, Results, ResultsItem } from './styles'
import PropTypes from 'prop-types'

const SearchBox = ({ team, addUser, invitational }) => {
  const dispatch = useDispatch()

  const allUsers = useSelector((state) => state.getAllUser)
  const { users } = allUsers

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [searchFocus, setSearchFocus] = useState(false)

  const handleChange = (queryStr) => {
    dispatch(getAllUsers(queryStr))
  }

  const handleAddUser = (user) => {
    addUser(user)
    setSearchFocus(false)
  }

  return (
    <Container>
      <Input
        id="search-box"
        type="text"
        onChange={(e) => handleChange(e.currentTarget.value)}
        // onBlur={(e) => setSearchFocus(false)}
        onFocus={(e) => setSearchFocus(true)}
        autoComplete="off"
      />
      {team && users && users[0] && searchFocus && (
        <Results>
          {users.map((user) => {
            if (
              (team.invitations &&
                team.invitations.some(
                  (inv) => inv.receiver._id === user._id
                )) ||
              (team.members &&
                team.members.some((member) => member._id === user._id)) ||
              (team.admins &&
                team.admins.some((admin) => admin._id === user._id)) ||
              (userInfo && userInfo._id === user._id) ||
              (team.owner && team.owner._id === user._id)
            ) {
            } else {
              return (
                <>
                  <ResultsItem key={user._id}>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <button onClick={(e) => handleAddUser(user)}>
                      {invitational ? 'Send' : 'Add'}
                    </button>
                  </ResultsItem>
                </>
              )
            }
          })}
        </Results>
      )}
    </Container>
  )
}

Comment.propTypes = {
  addUser: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  invitational: PropTypes.bool,
}

export default SearchBox

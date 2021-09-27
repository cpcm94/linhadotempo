import React from 'react'
import PropTypes from 'prop-types'
import {
  UsersWrapper,
  UsersListWrapper,
  UserNameWrapper,
  NameWrapper,
} from './UsersList.styles'
import { useHistory } from 'react-router-dom'

export const UsersList = ({ users }) => {
  let history = useHistory()
  const navigateToEditUserPage = (userId) => (e) => {
    e.preventDefault()
    history.push(`/editUser/${userId}`)
  }
  return (
    <UsersListWrapper>
      {users.map((user) => (
        <UsersWrapper key={user.id} onClick={navigateToEditUserPage(user.id)}>
          <NameWrapper>
            <UserNameWrapper>{user.name}</UserNameWrapper>
          </NameWrapper>
        </UsersWrapper>
      ))}
    </UsersListWrapper>
  )
}

UsersList.propTypes = {
  users: PropTypes.array,
}

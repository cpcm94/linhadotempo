import React from 'react'
import PropTypes from 'prop-types'
import {
  UsersWrapper,
  UsersListWrapper,
  UserNameWrapper,
  EditButtonWrapper,
  NameWrapper,
} from './UsersList.styles'
import { EditButton } from '../../_shared/EditButton'
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
        <UsersWrapper key={user.id}>
          <NameWrapper>
            <UserNameWrapper>{user.name}</UserNameWrapper>
          </NameWrapper>
          <EditButtonWrapper onClick={navigateToEditUserPage(user.id)}>
            <EditButton />
          </EditButtonWrapper>
        </UsersWrapper>
      ))}
    </UsersListWrapper>
  )
}

UsersList.propTypes = {
  users: PropTypes.array,
}

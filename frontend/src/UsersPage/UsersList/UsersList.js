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

export const UsersList = ({ users }) => {
  return (
    <UsersListWrapper>
      {users.map((user) => (
        <UsersWrapper key={user.id}>
          <NameWrapper>
            <UserNameWrapper>{user.name}</UserNameWrapper>
          </NameWrapper>
          <EditButtonWrapper>
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

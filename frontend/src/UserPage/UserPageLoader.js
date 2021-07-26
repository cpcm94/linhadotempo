import React, { useContext } from 'react'
import { UserPage } from './UserPage'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'

export const UserPageLoader = () => {
  const { user, userLoading, refetchUser } = useContext(CurrentUserContext)

  return userLoading ? (
    <span>Loading...</span>
  ) : user ? (
    <UserPage user={user} refetchUser={refetchUser} />
  ) : null
}

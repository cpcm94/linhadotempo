import React, { useContext } from 'react'
import { LoginPage } from './LoginPage'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { Redirect } from 'react-router-dom'

export const LoginPageLoader = () => {
  const { user, userDataLoading, refetchUser } = useContext(CurrentUserContext)
  return (
    <>
      {userDataLoading ? (
        <span>Loading...</span>
      ) : user ? (
        <Redirect to="/timelines" />
      ) : (
        <LoginPage refetchUser={refetchUser} />
      )}
    </>
  )
}

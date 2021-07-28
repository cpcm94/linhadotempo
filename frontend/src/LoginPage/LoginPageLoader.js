import React, { useContext } from 'react'
import { LoginPage } from './LoginPage'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { Redirect } from 'react-router-dom'

export const LoginPageLoader = () => {
  const { user, userLoading, refetchUser } = useContext(CurrentUserContext)
  const checkBeforeRedirect = user ? true : false

  return (
    <>
      {userLoading ? (
        <span>Loading...</span>
      ) : checkBeforeRedirect ? (
        <Redirect to="/timelines" />
      ) : (
        <LoginPage refetchUser={refetchUser} />
      )}
    </>
  )
}

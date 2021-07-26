import React, { useContext } from 'react'
import { LoginPage } from './LoginPage'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { Redirect } from 'react-router-dom'

export const LoginPageLoader = () => {
  const { user, userLoading } = useContext(CurrentUserContext)

  return (
    <>
      {userLoading ? (
        <span>Loading...</span>
      ) : user ? (
        <Redirect to="/" />
      ) : (
        <LoginPage />
      )}
    </>
  )
}

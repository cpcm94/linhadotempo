import React from 'react'
import { LoginPage } from './LoginPage'
import { ME_QUERY } from '../_shared/ME_QUERY'
import { useQuery, useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from './LOGOUT_MUTATION'
import { deleteToken } from '../_shared/AuthToken/deleteToken'
import { useHistory } from 'react-router-dom'

export const LoginPageLoader = () => {
  const { data, loading, error } = useQuery(ME_QUERY, {
    notifyOnNetworkStatusChange: true,
  })
  let history = useHistory()

  const refreshPage = () => {
    history.go(0)
  }

  const deleteTokenAndRefresh = () => {
    deleteToken()
    refreshPage()
  }

  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: deleteTokenAndRefresh,
  })

  if (loading || logoutLoading) return <span>Loading...</span>
  if (error) console.log(error)
  if (data && data.me)
    return (
      <>
        <div>User name:{data.me.name}</div>
        <div>User ID:{data.me.id}</div>
        <button onClick={logout}>Logout</button>
      </>
    )

  return <LoginPage />
}

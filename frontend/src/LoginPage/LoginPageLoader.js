import React from 'react'
import { LoginPage } from './LoginPage'
import { ME_QUERY } from './ME_QUERY'
import { useQuery, useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from './LOGOUT_MUTATION'
import { deleteToken } from '../_shared/AuthToken/deleteToken'

export const LoginPageLoader = () => {
  const { data, loading, error } = useQuery(ME_QUERY, {
    notifyOnNetworkStatusChange: true,
  })

  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => deleteToken(),
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

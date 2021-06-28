import React from 'react'
import { LoginPage } from './LoginPage'
import { ME_QUERY } from './ME_QUERY'
import { useQuery, useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from './LOGOUT_MUTATION'

export const LoginPageLoader = () => {
  const { data, loading, error } = useQuery(ME_QUERY, {
    notifyOnNetworkStatusChange: true,
  })

  const [logout, { loading: logoutLoading, error: logoutError }] =
    useMutation(LOGOUT_MUTATION)

  if (loading || logoutLoading) return <span>Loading...</span>
  if (error) console.log(error)
  if (logoutError) console.log(logoutError)
  if (data && data.me)
    return (
      <>
        <span>{data.me.name}</span>
        <span>{data.me.id}</span>
        <button onClick={logout}>Logout</button>
      </>
    )

  return <LoginPage />
}

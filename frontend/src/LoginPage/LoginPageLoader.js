import React from 'react'
import { LoginPage } from './LoginPage'
import { ME_QUERY } from './ME_QUERY'
import { useQuery } from '@apollo/client'

export const LoginPageLoader = () => {
  const { data, loading, error } = useQuery(ME_QUERY, {
    notifyOnNetworkStatusChange: true,
  })

  if (loading) return <span>Loading...</span>
  if (error) console.log(error)
  if (data && data.me)
    return (
      <>
        <span>{data.me.name}</span>
        <span>{data.me.id}</span>
      </>
    )

  return <LoginPage />
}

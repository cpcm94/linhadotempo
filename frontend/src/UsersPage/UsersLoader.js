import React from 'react'
import { useQuery } from '@apollo/client'
import { UsersPage } from './UsersPage'
import { USERS_QUERY } from './USERS_QUERY'

export const UsersLoader = () => {
  const { data, refetch, loading, error } = useQuery(USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }

  return loading ? (
    <span>Loading...</span>
  ) : data && data.users ? (
    <UsersPage users={data.users} refetch={refetch} />
  ) : null
}

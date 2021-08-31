import React from 'react'
import { useQuery } from '@apollo/client'
import { HASH_USER_QUERY } from './HASH_USER_QUERY'
import { RecoverPasswordPage } from './RecoverPasswordPage'
import { ExpiredLinkPage } from './ExpiredLinkPage'
import { useParams } from 'react-router'

export const RecoverPasswordPageLoader = () => {
  let { hashId } = useParams()

  const { data, loading, error } = useQuery(HASH_USER_QUERY, {
    variables: { hash_id: hashId },
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
    return <ExpiredLinkPage />
  }

  return loading ? (
    <span>Loading...</span>
  ) : data && data.hashUser ? (
    <RecoverPasswordPage user={data.hashUser.user} />
  ) : null
}

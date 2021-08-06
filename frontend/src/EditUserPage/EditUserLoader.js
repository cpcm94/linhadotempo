import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { USER_QUERY } from './USER_QUERY'
import { EditableUser } from './EditableUser'

export const EditUserLoader = () => {
  let { userId } = useParams()

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { id: userId },
    fetchPolicy: 'cache-and-network',
  })
  if (error) {
    return console.log(error)
  }
  return (
    <>{loading ? <span>Loading...</span> : <EditableUser user={data.user} />}</>
  )
}

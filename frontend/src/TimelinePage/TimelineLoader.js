import React from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINE_QUERY } from './TIMELINE_QUERY'
import { useParams } from 'react-router-dom'

export const TimelineLoader = () => {
  let { timelineId } = useParams()

  const { data, loading, error } = useQuery(TIMELINE_QUERY, {
    variables: { id: timelineId },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  if (data) {
    console.log('data', data)
  }

  return loading ? (
    <div>Loading...</div>
  ) : data ? (
    <div>Timeline info:</div>
  ) : null
}

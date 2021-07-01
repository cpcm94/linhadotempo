import React from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINES_QUERY } from './TIMELINES_QUERY'
import { TimelinesPage } from './TimelinesPage'

export const TimelinesLoader = () => {
  const { data, loading, error } = useQuery(TIMELINES_QUERY, {
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
    <TimelinesPage timelines={data.timelines} />
  ) : null
}

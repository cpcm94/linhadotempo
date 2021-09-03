import React from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINES_QUERY } from '../_shared/TIMELINES_QUERY'
import { TimelinesPage } from './TimelinesPage'
import { urlQueryTimelineIds } from '../_shared/urlQueryTimelineIds'

export const TimelinesLoader = () => {
  const { data, loading, error } = useQuery(TIMELINES_QUERY, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const selectedTimelinesIds = urlQueryTimelineIds()

  if (error) {
    console.error(error)
  }

  return loading ? (
    <div>Loading...</div>
  ) : data ? (
    <TimelinesPage
      timelines={data.timelines}
      currentSelectedTimelinesIds={selectedTimelinesIds}
    />
  ) : null
}

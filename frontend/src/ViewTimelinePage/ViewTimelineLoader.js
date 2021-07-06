import React from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINE_WITH_ENTRIES_QUERY } from './TIMELINE_WITH_ENTRIES_QUERY'
import { TimelinePage } from './TimelinePage'
import { useParams } from 'react-router-dom'

export const ViewTimelineLoader = () => {
  let { timelineId } = useParams()

  const { data, loading, error } = useQuery(TIMELINE_WITH_ENTRIES_QUERY, {
    variables: { id: timelineId },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  return loading ? (
    <span>Loading...</span>
  ) : data && data.timeline ? (
    <TimelinePage timelines={data.timeline} />
  ) : null
}

import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { TIMELINE_QUERY } from './TIMELINE_QUERY'
import { EditableTimeline } from './EditableTimeline'
import { TimelineNotFound } from '../_shared/TimelineNotFound'

export const EditTimelineLoader = () => {
  let { timelineId } = useParams()

  const { data, loading, error } = useQuery(TIMELINE_QUERY, {
    variables: { id: timelineId },
    fetchPolicy: 'cache-and-network',
  })
  if (error) {
    return console.log(error)
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : data && !data.timeline ? (
        <TimelineNotFound />
      ) : (
        <EditableTimeline timeline={data.timeline} />
      )}
    </>
  )
}

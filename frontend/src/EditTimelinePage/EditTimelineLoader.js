import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { TIMELINE_QUERY } from './TIMELINE_QUERY'
import { EditableTimeline } from './EditableTimeline'

export const EditTimelineLoader = () => {
  let { timelineId } = useParams()

  const { data, loading, error } = useQuery(TIMELINE_QUERY, {
    variables: { id: timelineId },
  })
  if (error) {
    return console.log(error)
  }
  console.log('data', data)
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <EditableTimeline timeline={data.timeline} />
      )}
    </>
  )
}

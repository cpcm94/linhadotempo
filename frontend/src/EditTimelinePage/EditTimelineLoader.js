import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TIMELINE_QUERY } from './TIMELINE_QUERY'
import { EditableTimeline } from './EditableTimeline'
import { TimelineNotFound } from './TimelineNotFound'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { TIMELINE_CATEGORIES_QUERY } from '../_shared/TIMELINE_CATEGORIES_QUERY'

export const EditTimelineLoader = () => {
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)
  let { timelineId } = useParams()
  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    TIMELINE_CATEGORIES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  )
  const { data, loading, error } = useQuery(TIMELINE_QUERY, {
    variables: { id: timelineId },
    fetchPolicy: 'cache-and-network',
  })
  if (error) {
    return console.log(error)
  }
  const isLoading = loading || userDataLoading || categoriesLoading

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : data && !data.timeline ? (
        <TimelineNotFound />
      ) : (
        <EditableTimeline
          timeline={data.timeline}
          bucketName={s3BucketName}
          timelineCategories={categoriesData.timeline_categories}
        />
      )}
    </>
  )
}

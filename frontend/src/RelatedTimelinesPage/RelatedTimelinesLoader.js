import { useQuery } from '@apollo/client'
import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { urlQueryTimelineIds } from '../_shared/urlQueryTimelineIds'
import { RelatedTimelinesPage } from './RelatedTimelinesPage'
import { RELATED_TIMELINES_QUERY } from './RELATED_TIMELINES_QUERY'

export const RelatedTimelinesLoader = () => {
  let { timelineId } = useParams()

  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)
  const { data, loading, error } = useQuery(RELATED_TIMELINES_QUERY, {
    variables: { id: timelineId },
    fetchPolicy: 'cache-and-network',
  })
  const selectedTimelinesIds = urlQueryTimelineIds()

  const isLoading = loading || userDataLoading
  if (error) {
    return console.log(error)
  }
  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <RelatedTimelinesPage
      relatedTimelines={data.relatedTimelines}
      selectedTimelinesIds={selectedTimelinesIds}
      bucketName={s3BucketName}
      timelineId={timelineId}
    />
  )
}

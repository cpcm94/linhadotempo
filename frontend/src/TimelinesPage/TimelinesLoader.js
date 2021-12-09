import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINES_QUERY } from '../_shared/TIMELINES_QUERY'
import { TimelinesPage } from './TimelinesPage'
import { urlQueryTimelineIds } from '../_shared/urlQueryTimelineIds'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { TIMELINE_CATEGORIES_QUERY } from '../_shared/TIMELINE_CATEGORIES_QUERY'

export const TimelinesLoader = () => {
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)
  const { data, loading, error } = useQuery(TIMELINES_QUERY, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  })
  const { data: timelineCategoriesData, loading: categoryLoading } = useQuery(
    TIMELINE_CATEGORIES_QUERY,
    {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    }
  )

  const selectedTimelinesIds = urlQueryTimelineIds()

  if (error) {
    console.error(error)
  }

  const anyLoading = categoryLoading || loading || userDataLoading

  return anyLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <TimelinesPage
      timelines={data.timelines}
      currentSelectedTimelinesIds={selectedTimelinesIds}
      categories={timelineCategoriesData.timeline_categories}
      bucketName={s3BucketName}
    />
  ) : null
}

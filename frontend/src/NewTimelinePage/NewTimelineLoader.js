import React, { useContext } from 'react'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { NewTimelinePage } from './NewTimelinePage'
import { TIMELINE_CATEGORIES_QUERY } from '../_shared/TIMELINE_CATEGORIES_QUERY'
import { useQuery } from '@apollo/client'

export const NewTimelineLoader = () => {
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)

  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    TIMELINE_CATEGORIES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  )
  const isLoading = categoriesLoading || userDataLoading
  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <NewTimelinePage
      bucketName={s3BucketName}
      timelineCategories={categoriesData.timeline_categories}
    />
  )
}

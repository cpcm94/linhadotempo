import React, { useContext } from 'react'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import { NewTimelinePage } from './NewTimelinePage'

export const NewTimelineLoader = () => {
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)

  return userDataLoading ? (
    <span>Loading...</span>
  ) : (
    <NewTimelinePage bucketName={s3BucketName} />
  )
}

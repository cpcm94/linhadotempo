import React, { useContext } from 'react'
import { NewTimelinePage } from './NewTimelinePage'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'

export const NewTimelineLoader = () => {
  const { user, userDataLoading } = useContext(CurrentUserContext)

  return (
    <>
      {userDataLoading ? (
        <span>Loading...</span>
      ) : (
        <NewTimelinePage user={user} />
      )}
    </>
  )
}

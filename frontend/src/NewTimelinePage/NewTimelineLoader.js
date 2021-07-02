import React from 'react'
import { NewTimelinePage } from './NewTimelinePage'

export const NewTimelineLoader = () => {
  return <>{userDataLoading ? <span>Loading...</span> : <NewTimelinePage />}</>
}

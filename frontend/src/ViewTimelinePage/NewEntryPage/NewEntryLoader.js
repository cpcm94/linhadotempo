import React, { useContext } from 'react'
import { NewEntryPage } from './NewEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'

const urlQueryTimelineIds = () => qs.parse(location.search).timelines.split(',')

export const NewEntryLoader = () => {
  const { loading, refetchTimelines, getTimelines } =
    useContext(TimelinesContext)
  const defaultEntryData = qs.parse(location.hash)

  const selectedTimelines = getTimelines(urlQueryTimelineIds())

  return loading ? (
    <span>Loading...</span>
  ) : (
    <NewEntryPage
      timelines={selectedTimelines}
      refetchTimelines={refetchTimelines}
      defaultEntryData={defaultEntryData}
    />
  )
}

import React, { useContext } from 'react'
import { NewEntryPage } from './NewEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'
import { filterTimelines } from '../filterTimelines'

export const NewEntryLoader = () => {
  const { timelines, loading, refetchTimelines } = useContext(TimelinesContext)
  const queriedTimelines = qs.parse(location.search, {
    arrayFormat: 'comma',
  }).timelines

  const hash = qs.parse(location.hash)

  const filteredTimelines = filterTimelines(timelines, queriedTimelines)

  return loading ? (
    <span>Loading...</span>
  ) : timelines ? (
    <NewEntryPage
      timelines={filteredTimelines}
      refetchTimelines={refetchTimelines}
      defaultDate={hash}
    />
  ) : null
}

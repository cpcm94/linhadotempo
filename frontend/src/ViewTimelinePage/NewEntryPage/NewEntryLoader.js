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

  const hash =
    location.hash === ''
      ? null
      : qs.parse(location.hash).timeline === 'null'
      ? null
      : qs.parse(location.hash)

  const timelinesArray = Array.isArray(queriedTimelines)
    ? queriedTimelines
    : queriedTimelines.split()

  const filteredTimelines = filterTimelines(timelines, timelinesArray)

  return loading ? (
    <span>Loading...</span>
  ) : timelines ? (
    <NewEntryPage
      timelines={filteredTimelines}
      refetchTimelines={refetchTimelines}
      defaultDateForNewEntry={hash}
    />
  ) : null
}

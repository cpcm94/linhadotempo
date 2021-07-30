import React, { useContext } from 'react'
import { EditEntryPage } from './EditEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'
import { filterTimelines } from '../filterTimelines'
import { NotValidEntry } from './NotValidEntry'

export const EditEntryLoader = () => {
  const { timelines, loading, refetchTimelines } = useContext(TimelinesContext)
  const queriedTimelines = qs.parse(location.search, {
    arrayFormat: 'comma',
  }).timelines

  const entryId = qs.parse(location.hash).entry

  const filteredEntryById =
    entryId &&
    timelines &&
    timelines
      .map((timeline) => timeline.time_entries)
      .flat()
      .filter((entry) => entry.id === entryId)[0]

  const timelinesArray = Array.isArray(queriedTimelines)
    ? queriedTimelines
    : queriedTimelines.split()

  const filteredTimelines = filterTimelines(timelines, timelinesArray)

  return loading ? (
    <span>Loading...</span>
  ) : timelines && filteredEntryById ? (
    <EditEntryPage
      timelines={filteredTimelines}
      refetchTimelines={refetchTimelines}
      entryToUpdate={filteredEntryById}
    />
  ) : (
    <NotValidEntry />
  )
}

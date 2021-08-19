import React, { useContext } from 'react'
import { EditEntryPage } from './EditEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'
import { NotValidEntry } from './NotValidEntry'

const urlQueryTimelineIds = () => qs.parse(location.search).timelines.split(',')

export const EditEntryLoader = () => {
  const { timelines, loading, refetchTimelines, getTimelines } =
    useContext(TimelinesContext)

  const entryId = qs.parse(location.hash).entry

  const filteredEntryById =
    entryId &&
    timelines &&
    timelines
      .map((timeline) => timeline.time_entries)
      .flat()
      .filter((entry) => entry.id === entryId)[0]

  const selectedTimelines = getTimelines(urlQueryTimelineIds())

  return loading ? (
    <span>Loading...</span>
  ) : timelines && filteredEntryById ? (
    <EditEntryPage
      timelines={selectedTimelines}
      refetchTimelines={refetchTimelines}
      entryToEdit={filteredEntryById}
    />
  ) : (
    <NotValidEntry />
  )
}

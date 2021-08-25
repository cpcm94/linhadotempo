import React, { useContext } from 'react'
import { TimelinePage } from './TimelinePage'
import { TimelinesContext } from './TimelinesContextProvider'
import qs from 'query-string'
import { NoValidTimelinesPage } from './NoValidTimelinesPage'
import { useQuery } from '@apollo/client'
import { TIME_ENTRIES_QUERY } from './TIME_ENTRIES_QUERY'

const urlQueryTimelineIds = () => qs.parse(location.search).timelines.split(',')

export const ViewTimelinesLoader = () => {
  const { timelines, loading, getTimelines } = useContext(TimelinesContext)
  const selectedTimelines = getTimelines(urlQueryTimelineIds())
  const {
    data: entriesData,
    previousData: previousEntries,
    loading: entriesLoading,
  } = useQuery(TIME_ENTRIES_QUERY, {
    variables: { timeline_ids: urlQueryTimelineIds() },
  })

  const noValidTimelines =
    urlQueryTimelineIds().length > 0 && selectedTimelines.length === 0

  const containsInvalidTimelines =
    urlQueryTimelineIds().length !== selectedTimelines.length

  return loading || entriesLoading ? (
    <span>Loading...</span>
  ) : noValidTimelines ? (
    <NoValidTimelinesPage />
  ) : timelines && entriesData ? (
    <TimelinePage
      timelines={selectedTimelines}
      entries={entriesData.time_entries}
      previousEntries={previousEntries && previousEntries.time_entries}
      hasInvalidTimelines={containsInvalidTimelines}
    />
  ) : null
}

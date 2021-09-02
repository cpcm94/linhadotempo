import React, { useContext } from 'react'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { TimelinesContext } from './TimelinesContextProvider'
import { NoValidTimelinesPage } from './NoValidTimelinesPage'
import { useQuery } from '@apollo/client'
import { TIME_ENTRIES_QUERY } from './TIME_ENTRIES_QUERY'
import { urlQueryTimelineIds } from '../_shared/urlQueryTimelineIds'

export const ViewTimelinesLoader = () => {
  const { timelines, loading, getTimelines } = useContext(TimelinesContext)
  const selectedTimelines = getTimelines(urlQueryTimelineIds())
  const {
    data: entriesData,
    previousData: previousEntries,
    loading: entriesLoading,
  } = useQuery(TIME_ENTRIES_QUERY, {
    fetchPolicy: 'cache-and-network',
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

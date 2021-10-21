import React, { useContext } from 'react'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { TimelinesContext } from './TimelinesContextProvider'
import { NoValidTimelinesPage } from './NoValidTimelinesPage'
import { useQuery } from '@apollo/client'
import { TIME_ENTRIES_QUERY } from './TIME_ENTRIES_QUERY'
import { urlQueryTimelineIds } from '../_shared/urlQueryTimelineIds'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import qs from 'query-string'

export const ViewTimelinesLoader = () => {
  const { timelines, loading, getTimelines } = useContext(TimelinesContext)
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)
  const selectedTimelines = getTimelines(urlQueryTimelineIds())
  const {
    data: entriesData,
    previousData: previousEntries,
    loading: entriesLoading,
  } = useQuery(TIME_ENTRIES_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { timeline_ids: urlQueryTimelineIds() },
  })

  const hasZoomOut = qs.parse(location.hash).zoomOut === 'true'
  const dateFromHash = qs.parse(location.hash).date
    ? qs.parse(location.hash).date
    : 'null'

  const noValidTimelines =
    urlQueryTimelineIds().length > 0 && selectedTimelines.length === 0

  const containsInvalidTimelines =
    urlQueryTimelineIds().length !== selectedTimelines.length

  const isLoading = userDataLoading || loading || entriesLoading

  return isLoading ? (
    <span>Loading...</span>
  ) : noValidTimelines ? (
    <NoValidTimelinesPage />
  ) : timelines && entriesData ? (
    <TimelinePage
      timelines={selectedTimelines}
      entries={entriesData.time_entries}
      previousEntries={previousEntries && previousEntries.time_entries}
      hasInvalidTimelines={containsInvalidTimelines}
      bucketName={s3BucketName}
      hasZoomOut={hasZoomOut}
      dateFromHash={dateFromHash}
    />
  ) : null
}

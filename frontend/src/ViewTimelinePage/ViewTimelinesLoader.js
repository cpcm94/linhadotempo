import React, { useContext, useRef } from 'react'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { TimelinesContext } from './TimelinesContextProvider'
import { NoValidTimelinesPage } from './NoValidTimelinesPage'
import { useQuery } from '@apollo/client'
import { TIME_ENTRIES_QUERY } from './TIME_ENTRIES_QUERY'
import { urlQueryTimelineIds } from '../_shared/urlQueryTimelineIds'
import { CurrentUserContext } from '../_shared/CurrentUserContextProvider'
import qs from 'query-string'
import { TIME_ENTRY_CATEGORIES_QUERY } from '../_shared/TIME_ENTRY_CATEGORIES_QUERY'

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
  const { data: entryCategoriesData, loading: entryCategoriesLoading } =
    useQuery(TIME_ENTRY_CATEGORIES_QUERY)

  const hashObject = qs.parse(location.hash)

  const dateFromHash = hashObject.date
  const newEntryId = useRef(hashObject.entryId || null)

  const noValidTimelines =
    urlQueryTimelineIds().length > 0 && selectedTimelines.length === 0

  const containsInvalidTimelines =
    urlQueryTimelineIds().length !== selectedTimelines.length

  const isLoading =
    userDataLoading || loading || entriesLoading || entryCategoriesLoading

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
      dateFromHash={dateFromHash}
      newEntryId={newEntryId.current}
      entryCategories={entryCategoriesData.time_entry_categories}
    />
  ) : null
}

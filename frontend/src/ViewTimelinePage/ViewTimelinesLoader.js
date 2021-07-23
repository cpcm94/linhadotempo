import React, { useContext } from 'react'
import { TimelinePage } from './TimelinePage'
import { TimelinesContext } from './TimelinesContextProvider'
import { filterTimelines } from './filterTimelines'
import qs from 'query-string'
import { NoValidTimelinesPage } from './NoValidTimelinesPage'

export const ViewTimelinesLoader = () => {
  const { timelines, previousTimelines, loading } = useContext(TimelinesContext)

  const queriedTimelines = qs.parse(location.search, {
    arrayFormat: 'comma',
  }).timelines

  const timelinesArray = Array.isArray(queriedTimelines)
    ? queriedTimelines
    : queriedTimelines.split()

  const filteredTimelines = filterTimelines(timelines, timelinesArray)
  const filteredPreviousTimelines = filterTimelines(
    previousTimelines,
    timelinesArray
  )
  const noValidTimelines =
    timelinesArray.length > 0 && filteredTimelines.length === 0

  const containsInvalidTimelines =
    timelinesArray.length !== filteredTimelines.length

  return loading ? (
    <span>Loading...</span>
  ) : noValidTimelines ? (
    <NoValidTimelinesPage />
  ) : timelines ? (
    <TimelinePage
      timelines={filteredTimelines}
      previousTimelines={filteredPreviousTimelines}
      hasInvalidTimelines={containsInvalidTimelines}
    />
  ) : null
}

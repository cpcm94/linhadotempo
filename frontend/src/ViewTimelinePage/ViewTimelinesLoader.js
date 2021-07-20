import React, { useContext } from 'react'
import { TimelinePage } from './TimelinePage'
import { TimelinesContext } from './TimelinesContextProvider'
import { filterTimelines } from './filterTimelines'
import qs from 'query-string'

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

  return loading ? (
    <span>Loading...</span>
  ) : timelines ? (
    <TimelinePage
      timelines={filteredTimelines}
      previousTimelines={filteredPreviousTimelines}
    />
  ) : null
}

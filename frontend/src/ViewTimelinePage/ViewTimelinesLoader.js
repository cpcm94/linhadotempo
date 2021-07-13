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

  const filteredTimelines = filterTimelines(timelines, queriedTimelines)
  const filteredPreviousTimelines = filterTimelines(
    previousTimelines,
    queriedTimelines
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

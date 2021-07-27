import React, { useContext } from 'react'
import { SelectTimelines } from './SelectTimelines'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'

export const SelectTimelinesLoader = () => {
  const { timelines, loading } = useContext(TimelinesContext)
  const queriedTimelines = qs.parse(location.search, {
    arrayFormat: 'comma',
  }).timelines

  const timelinesArray = Array.isArray(queriedTimelines)
    ? queriedTimelines
    : queriedTimelines.split()

  return loading ? (
    <span>Loading...</span>
  ) : timelines ? (
    <SelectTimelines timelines={timelines} queriedTimelines={timelinesArray} />
  ) : null
}

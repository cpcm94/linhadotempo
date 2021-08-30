import React, { useContext } from 'react'
import { SelectTimelines } from './SelectTimelines'
import { TimelinesContext } from '../TimelinesContextProvider'
import { urlQueryTimelineIds } from '../urlQueryTimelineIds'

export const SelectTimelinesLoader = () => {
  const { timelines, loading } = useContext(TimelinesContext)

  const selectedTimelines = urlQueryTimelineIds()

  return loading ? (
    <span>Loading...</span>
  ) : timelines ? (
    <SelectTimelines
      timelines={timelines}
      currentSelectedTimelines={selectedTimelines}
    />
  ) : null
}

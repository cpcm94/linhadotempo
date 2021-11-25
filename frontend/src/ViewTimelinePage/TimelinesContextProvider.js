import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINES_QUERY } from '../_shared/TIMELINES_QUERY'
import PropTypes from 'prop-types'
import { filterTimelines } from './filterTimelines'
import { useState } from 'react'

export const TimelinesContext = createContext()
export const TimelinesContextProvider = ({ children }) => {
  const {
    data: timelinesData,
    previousData: previousTimelineData,
    loading,
    refetch: refetchTimelines,
  } = useQuery(TIMELINES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  })
  const [timelineIdsDisplayingOrigin, setTimelineIdsDisplayingOrigin] =
    useState([])

  const timelines = timelinesData ? timelinesData.timelines : null
  const previousTimelines = previousTimelineData
    ? previousTimelineData.timelines
    : null

  const contextPayload = {
    timelines,
    previousTimelines,
    loading,
    refetchTimelines,
    getTimelines: (timelineIds) => filterTimelines(timelines, timelineIds),
    timelineIdsDisplayingOrigin,
    setTimelineIdsDisplayingOrigin,
  }

  return (
    <TimelinesContext.Provider value={contextPayload}>
      {children}
    </TimelinesContext.Provider>
  )
}

TimelinesContextProvider.propTypes = {
  children: PropTypes.object,
}

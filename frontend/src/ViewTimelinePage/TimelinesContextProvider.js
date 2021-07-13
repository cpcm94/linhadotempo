import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { TIMELINES_QUERY } from '../_shared/TIMELINES_QUERY'
import PropTypes from 'prop-types'

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

  const timelines = timelinesData ? timelinesData.timelines : null
  const previousTimelines = previousTimelineData
    ? previousTimelineData.timelines
    : null

  return (
    <TimelinesContext.Provider
      value={{ timelines, previousTimelines, loading, refetchTimelines }}
    >
      {children}
    </TimelinesContext.Provider>
  )
}

TimelinesContextProvider.propTypes = {
  children: PropTypes.object,
}

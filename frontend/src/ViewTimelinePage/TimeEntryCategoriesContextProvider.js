import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { TIME_ENTRY_CATEGORIES_QUERY } from '../_shared/TIME_ENTRY_CATEGORIES_QUERY'

export const TimeEntryCategoriesContext = createContext()
export const TimeEntryCategoriesContextProvider = ({ children }) => {
  const { data: entryCategoriesData, loading } = useQuery(
    TIME_ENTRY_CATEGORIES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first',
    }
  )
  const categories = entryCategoriesData
    ? entryCategoriesData.time_entry_categories
    : null

  const contextPayload = {
    categories,
    loading,
  }

  return (
    <TimeEntryCategoriesContext.Provider value={contextPayload}>
      {children}
    </TimeEntryCategoriesContext.Provider>
  )
}
TimeEntryCategoriesContextProvider.propTypes = {
  children: PropTypes.array,
}

import { useQuery } from '@apollo/client'
import React from 'react'
import { TIME_ENTRY_CATEGORIES_QUERY } from '../_shared/TIME_ENTRY_CATEGORIES_QUERY'
import { TimeEntryCategoriesPage } from './TimeEntryCategoriesPage'

export const TimeEntryCategoriesLoader = () => {
  const { data, loading, error } = useQuery(TIME_ENTRY_CATEGORIES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <TimeEntryCategoriesPage categories={data.time_entry_categories} />
  )
}

import { useQuery } from '@apollo/client'
import React from 'react'
import { TIMELINE_CATEGORIES_QUERY } from '../_shared/TIMELINE_CATEGORIES_QUERY'
import { TimelineCategoriesPage } from './TimelineCategoriesPage'

export const CategoriesLoader = () => {
  const { data, loading, error } = useQuery(TIMELINE_CATEGORIES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <TimelineCategoriesPage categories={data.timeline_categories} />
  )
}

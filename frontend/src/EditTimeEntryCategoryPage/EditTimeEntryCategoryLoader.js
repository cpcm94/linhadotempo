import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { EditableTimeEntryCategory } from './EditableTimeEntryCategory'
import { TIME_ENTRY_CATEGORY_QUERY } from './TIME_ENTRY_CATEGORY_QUERY'

export const EditTimeEntryCategoryLoader = () => {
  let { categoryId } = useParams()

  const { data, loading, error } = useQuery(TIME_ENTRY_CATEGORY_QUERY, {
    variables: { id: categoryId },
  })
  if (error) {
    return console.log(error)
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <EditableTimeEntryCategory categoryData={data.time_entry_category} />
  )
}

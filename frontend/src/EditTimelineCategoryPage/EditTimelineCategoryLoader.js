import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { TIMELINE_CATEGORY_QUERY } from './TIMELINE_CATEGORY_QUERY'
import { EditableTimelineCategory } from './EditableTimelineCategory'

export const EditTimelineCategoryLoader = () => {
  let { categoryId } = useParams()

  const { data, loading, error } = useQuery(TIMELINE_CATEGORY_QUERY, {
    variables: { id: categoryId },
  })
  if (error) {
    return console.log(error)
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <EditableTimelineCategory categoryData={data.timeline_category} />
  )
}

import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { BOOK_QUERY } from './BOOK_QUERY'
import { EditBookPage } from './EditBookPage'

export const EditBookLoader = () => {
  let { bookId } = useParams()

  const { data, loading, error } = useQuery(BOOK_QUERY, {
    variables: { id: bookId },
    fetchPolicy: 'cache-and-network',
  })
  if (error) {
    return console.log(error)
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <EditBookPage bookData={data.book} />
  )
}

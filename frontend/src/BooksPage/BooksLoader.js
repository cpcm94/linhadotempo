import { useQuery } from '@apollo/client'
import React from 'react'
import { BOOKS_QUERY } from '../_shared/BOOKS_QUERY'
import { BooksPage } from './BooksPage'

export const BooksLoader = () => {
  const { data, loading, error } = useQuery(BOOKS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }
  return loading ? <span>Loading...</span> : <BooksPage books={data.books} />
}

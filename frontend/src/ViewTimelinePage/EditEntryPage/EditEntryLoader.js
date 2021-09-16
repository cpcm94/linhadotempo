import React, { useContext } from 'react'
import { EditEntryPage } from './EditEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'
import { NotValidEntry } from './NotValidEntry'
import { urlQueryTimelineIds } from '../../_shared/urlQueryTimelineIds'
import { useQuery } from '@apollo/client'
import { TIME_ENTRY_QUERY } from './TIME_ENTRY_QUERY'
import { BOOKS_QUERY } from './BOOKS_QUERY'

export const EditEntryLoader = () => {
  const entryId = qs.parse(location.hash).entry
  const { timelines, loading, getTimelines } = useContext(TimelinesContext)
  const { data: entryData, loading: entryLoading } = useQuery(
    TIME_ENTRY_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        id: entryId,
      },
    }
  )
  const { data: booksData, loading: booksLoading } = useQuery(BOOKS_QUERY)
  const selectedTimelines = getTimelines(urlQueryTimelineIds())
  const anyLoading = loading || entryLoading || booksLoading

  return anyLoading ? (
    <span>Loading...</span>
  ) : timelines && entryData ? (
    <EditEntryPage
      timelines={selectedTimelines}
      entryToEdit={entryData.time_entry}
      books={booksData.books}
    />
  ) : (
    <NotValidEntry />
  )
}

import React, { useContext } from 'react'
import { EditEntryPage } from './EditEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../../TimelinesContextProvider'
import { NotValidEntry } from './NotValidEntry'
import { urlQueryTimelineIds } from '../../../_shared/urlQueryTimelineIds'
import { useQuery } from '@apollo/client'
import { TIME_ENTRY_QUERY } from './TIME_ENTRY_QUERY'
import { BOOKS_QUERY } from '../../../_shared/BOOKS_QUERY'
import { CurrentUserContext } from '../../../_shared/CurrentUserContextProvider'

export const EditEntryLoader = () => {
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)
  const entryId = qs.parse(location.hash).entry
  const { timelines, loading, getTimelines } = useContext(TimelinesContext)

  const { data: entryData, loading: entryLoading } = useQuery(
    TIME_ENTRY_QUERY,
    {
      variables: {
        id: entryId,
      },
    }
  )
  const hasZoomOut = qs.parse(location.hash).zoomOut === 'true'
  const { data: booksData, loading: booksLoading } = useQuery(BOOKS_QUERY)
  const selectedTimelines = getTimelines(urlQueryTimelineIds())
  const isLoading = loading || entryLoading || booksLoading || userDataLoading

  return isLoading ? (
    <span>Loading...</span>
  ) : timelines && entryData ? (
    <EditEntryPage
      timelines={selectedTimelines}
      entryToEdit={entryData.time_entry}
      books={booksData.books}
      bucketName={s3BucketName}
      hasZoomOut={hasZoomOut}
    />
  ) : (
    <NotValidEntry />
  )
}

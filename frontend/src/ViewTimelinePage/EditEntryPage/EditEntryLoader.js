import React, { useContext } from 'react'
import { EditEntryPage } from './EditEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../TimelinesContextProvider'
import { NotValidEntry } from './NotValidEntry'
import { urlQueryTimelineIds } from '../urlQueryTimelineIds'
import { useQuery } from '@apollo/client'
import { TIME_ENTRY_QUERY } from './TIME_ENTRY_QUERY'

const entryId = qs.parse(location.hash).entry

export const EditEntryLoader = () => {
  const { timelines, loading, getTimelines } = useContext(TimelinesContext)
  const { data: entryData, loading: entryLoading } = useQuery(
    TIME_ENTRY_QUERY,
    {
      variables: {
        id: entryId,
      },
    }
  )

  const selectedTimelines = getTimelines(urlQueryTimelineIds())

  return loading || entryLoading ? (
    <span>Loading...</span>
  ) : timelines && entryData ? (
    <EditEntryPage
      timelines={selectedTimelines}
      entryToEdit={entryData.time_entry}
    />
  ) : (
    <NotValidEntry />
  )
}

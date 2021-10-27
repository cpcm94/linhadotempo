import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import PropTypes from 'prop-types'
import { convertObjectToArray } from '../../../../../_shared/convertObjectToArray'
import { groupBy } from '../../../../../_shared/groupBy'

export const MonthEntries = ({
  timeEntriesByMonth,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
}) => {
  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const entriesSortedByDay = arrayOfGroupedEntriesByDay.sort(
    (a, b) => b[0].day - a[0].day
  )

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper>
        <EntriesWithoutDay
          timeEntriesWithoutDay={entriesWithoutDay}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
        />
      </MonthAndEntryWrapper>
      <DayEntries
        timeEntriesByDay={entriesSortedByDay}
        newEntryId={newEntryId}
        forwardedRef={forwardedRef}
        visibleTimelines={visibleTimelines}
        bucketName={bucketName}
      />
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
}

import React from 'react'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { convertObjectToArray } from '../../../../_shared/convertObjectToArray'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import PropTypes from 'prop-types'
import { groupBy } from '../../../../_shared/groupBy'
import { filterRelevantPeriodsForTheDay } from '../../../../_shared/filterRelevantPeriodsForTheDay'
import { Entries } from './Entries/Entries'

export const MonthEntries = ({
  timeEntriesByMonth,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const periodsForEntriesWithoutDay = periods.filter((subArray) => {
    const periodStartYear = subArray[0].year
    const entryYear = timeEntriesByMonth[0].year

    const periodStartMonth = subArray[0].month
    const entryMonth = timeEntriesByMonth[0].month

    if (periodStartYear < entryYear) {
      return subArray
    } else if (periodStartYear === entryYear) {
      if (periodStartMonth <= entryMonth) {
        return subArray
      }
    }
  })
  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const entriesSortedByDay = arrayOfGroupedEntriesByDay.sort(
    (a, b) => a[0].day - b[0].day
  )

  const atLeastOneEntryWithoutDay = !!entriesWithoutDay[0]

  return (
    <>
      {entriesSortedByDay.map((timeEntriesByDay, index) => (
        <Entries
          entries={timeEntriesByDay}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          displayEntry={displayEntry}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
          periods={filterRelevantPeriodsForTheDay(
            periods,
            timeEntriesByDay[0].year,
            timeEntriesByDay[0].month,
            timeEntriesByDay[0].day
          )}
          key={index}
        />
      ))}
      {atLeastOneEntryWithoutDay && (
        <EntriesWithoutDay
          timeEntriesWithoutDay={entriesWithoutDay}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
          periods={periodsForEntriesWithoutDay}
          displayEntry={displayEntry}
        />
      )}
    </>
  )
}
MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}

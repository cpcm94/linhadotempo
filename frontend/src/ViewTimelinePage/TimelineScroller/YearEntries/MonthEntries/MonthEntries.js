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
  const periodsWithEndMonthGreaterThan = periods.filter((subArray) => {
    if (subArray[0].year < timeEntriesByMonth[0].year) {
      return subArray
    } else if (subArray[0].year === timeEntriesByMonth[0].year) {
      if (!subArray[0].day) {
        return subArray
      }
    }
  })
  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const entriesSortedByDay = arrayOfGroupedEntriesByDay.sort(
    (a, b) => b[0].day - a[0].day
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
          periods={periodsWithEndMonthGreaterThan}
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

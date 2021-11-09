import React from 'react'
import { MonthEntriesWrapper } from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { convertObjectToArray } from '../../../../_shared/convertObjectToArray'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import PropTypes from 'prop-types'
import { groupBy } from '../../../../_shared/groupBy'

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
    if (subArray[1].year > timeEntriesByMonth[0].year || !subArray[1].year) {
      return subArray
    } else if (subArray[1].year === timeEntriesByMonth[0].year) {
      if (subArray[1].month >= timeEntriesByMonth[0].month) {
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
    <MonthEntriesWrapper>
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
      <DayEntries
        timeEntriesByDay={entriesSortedByDay}
        newEntryId={newEntryId}
        forwardedRef={forwardedRef}
        displayEntry={displayEntry}
        visibleTimelines={visibleTimelines}
        bucketName={bucketName}
        periods={periods}
      />
    </MonthEntriesWrapper>
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

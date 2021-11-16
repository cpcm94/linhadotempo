import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
} from './MonthEntries.styles'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import PropTypes from 'prop-types'
import { convertObjectToArray } from '../../../../../_shared/convertObjectToArray'
import { groupBy } from '../../../../../_shared/groupBy'
import { Entries } from './Entries/Entries'
import { filterRelevantPeriodsForTheDay } from '../../../../../_shared/filterRelevantPeriodsForTheDay'

export const MonthEntries = ({
  timeEntriesByMonth,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
  yearHasNoEntryWithoutMonth,
  yearHasNoEntryWithoutDay,
  monthIndex,
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

  const yearHasNoEntriesWithoutMonthOrDay =
    yearHasNoEntryWithoutDay && yearHasNoEntryWithoutMonth

  const yearHasEntryWithoutDayButFirstEntryHasDay =
    monthIndex === 0 && yearHasNoEntryWithoutMonth && !yearHasNoEntryWithoutDay

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper>
        {atLeastOneEntryWithoutDay && (
          <EntriesWithoutDay
            timeEntriesWithoutDay={entriesWithoutDay}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
            visibleTimelines={visibleTimelines}
            bucketName={bucketName}
            periods={periodsWithEndMonthGreaterThan}
            displayEntry={displayEntry}
            showDate={yearHasNoEntryWithoutMonth && monthIndex === 0}
          />
        )}
      </MonthAndEntryWrapper>
      {entriesSortedByDay.map((timeEntriesByDay, index) => (
        <Entries
          entries={timeEntriesByDay}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
          periods={filterRelevantPeriodsForTheDay(
            periods,
            timeEntriesByDay[0].year,
            timeEntriesByDay[0].month,
            timeEntriesByDay[0].day
          )}
          showDate={
            (yearHasNoEntriesWithoutMonthOrDay &&
              index === 0 &&
              monthIndex === 0) ||
            yearHasEntryWithoutDayButFirstEntryHasDay
          }
          displayEntry={displayEntry}
          key={index}
        />
      ))}
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
  displayEntry: PropTypes.object,
  yearHasNoEntryWithoutMonth: PropTypes.bool,
  yearHasNoEntryWithoutDay: PropTypes.bool,
  monthIndex: PropTypes.number,
}

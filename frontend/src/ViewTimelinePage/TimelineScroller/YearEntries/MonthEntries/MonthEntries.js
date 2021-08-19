import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
  EntryWithoutDayWrapper,
  MonthWrapper,
  YearWrapper,
  MonthSpanWrapper,
  DateText,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { convertObjectToArray } from '../../convertObjectToArray'
import { groupBy } from '../../groupBy'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import { monthNameArray } from '../../../../_shared/monthNameArray'
import PropTypes from 'prop-types'

export const MonthEntries = ({
  timeEntriesByMonth,
  timelines,
  newEntryId,
  forwardedRef,
  displayEntry,
  hasYear,
}) => {
  const month = monthNameArray[timeEntriesByMonth[0].month]
  const year = timeEntriesByMonth[0].year
  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()

  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const entriesSortedByDay = arrayOfGroupedEntriesByDay.sort(
    (a, b) => b[0].day - a[0].day
  )
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryMonth =
    isNotFirstEntry &&
    displayEntry.month === timeEntriesByMonth[0].month &&
    displayEntry.year === timeEntriesByMonth[0].year

  const atLeastOneEntryWithoutDay = entriesWithoutDay[0] ? true : false

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper>
        {atLeastOneEntryWithoutDay && (
          <MonthWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
            <MonthSpanWrapper hasYear={hasYear}>
              <span>{month}</span>
            </MonthSpanWrapper>
            <YearWrapper>
              <DateText>de</DateText>
              <span>{yearAC}</span>
            </YearWrapper>
          </MonthWrapper>
        )}
        <EntryWithoutDayWrapper>
          <EntriesWithoutDay
            timeEntriesWithoutDay={entriesWithoutDay}
            timelines={timelines}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
          />
        </EntryWithoutDayWrapper>
      </MonthAndEntryWrapper>
      <DayEntries
        timelines={timelines}
        timeEntriesByDay={entriesSortedByDay}
        newEntryId={newEntryId}
        forwardedRef={forwardedRef}
        displayEntry={displayEntry}
        hasMonth={atLeastOneEntryWithoutDay}
        hasYear={hasYear}
      />
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  timelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  hasYear: PropTypes.bool,
}

import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
  EntryWithoutDayWrapper,
  MonthWrapper,
  MonthDateWrapper,
  DateText,
  DateWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { convertObjectToArray } from '../../convertObjectToArray'
import { groupBy } from '../../groupBy'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import { abvMonthNameArray } from '../../../../_shared/monthNameArray'
import PropTypes from 'prop-types'

export const MonthEntries = ({
  timeEntriesByMonth,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
}) => {
  const month = abvMonthNameArray[timeEntriesByMonth[0].month]
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
            <DateWrapper>
              <MonthDateWrapper>
                <span>{month}</span>
              </MonthDateWrapper>
              <DateText>de</DateText>
              <span>{yearAC}</span>
            </DateWrapper>
          </MonthWrapper>
        )}
        <EntryWithoutDayWrapper>
          <EntriesWithoutDay
            timeEntriesWithoutDay={entriesWithoutDay}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
            visibleTimelines={visibleTimelines}
          />
        </EntryWithoutDayWrapper>
      </MonthAndEntryWrapper>
      <DayEntries
        timeEntriesByDay={entriesSortedByDay}
        newEntryId={newEntryId}
        forwardedRef={forwardedRef}
        displayEntry={displayEntry}
        visibleTimelines={visibleTimelines}
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
}

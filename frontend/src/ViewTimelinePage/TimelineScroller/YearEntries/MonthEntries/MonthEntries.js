import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
  EntryWithoutDayWrapper,
  MonthWrapper,
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
  newEntryId,
  forwardedRef,
  displayEntry,
}) => {
  const month = monthNameArray[timeEntriesByMonth[0].month]

  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const isDisplayEntryMonth =
    displayEntry &&
    displayEntry.month === timeEntriesByMonth[0].month &&
    displayEntry.year === timeEntriesByMonth[0].year

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper>
        <MonthWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
          <span>{month}</span>
        </MonthWrapper>
        <EntryWithoutDayWrapper>
          <EntriesWithoutDay
            timeEntriesWithoutDay={entriesWithoutDay}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
          />
        </EntryWithoutDayWrapper>
      </MonthAndEntryWrapper>
      <DayEntries
        timeEntriesByDay={arrayOfGroupedEntriesByDay}
        newEntryId={newEntryId}
        forwardedRef={forwardedRef}
        displayEntry={displayEntry}
      />
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}

import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { EntryWithoutDayWrapper } from './EntryWithoutDayWrapper'
import { MonthWrapper } from './MonthWrapper'
import { convertObjectToArray } from '../../convertObjectToArray'
import { groupBy } from '../../groupBy'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import { monthNameArray } from './monthNameArray'
import PropTypes from 'prop-types'

export const MonthEntries = ({ timeEntriesByMonth, newEntryId }) => {
  const month = monthNameArray[timeEntriesByMonth[0].month]

  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const hasEntriesWithoutDay = entriesWithoutDay.length > 0

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper>
        <MonthWrapper>{hasEntriesWithoutDay ? month : null}</MonthWrapper>
        <EntryWithoutDayWrapper>
          <EntriesWithoutDay
            timeEntriesWithoutDay={entriesWithoutDay}
            newEntryId={newEntryId}
          />
        </EntryWithoutDayWrapper>
      </MonthAndEntryWrapper>
      <DayEntries
        timeEntriesByDay={arrayOfGroupedEntriesByDay}
        newEntryId={newEntryId}
      />
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  newEntryId: PropTypes.string,
}

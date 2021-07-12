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
import PropTypes from 'prop-types'

export const MonthEntries = ({ timeEntriesByMonth }) => {
  const month = timeEntriesByMonth[0].month

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
          <EntriesWithoutDay timeEntriesWithoutDay={entriesWithoutDay} />
        </EntryWithoutDayWrapper>
      </MonthAndEntryWrapper>
      <DayEntries timeEntriesByDay={arrayOfGroupedEntriesByDay} />
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
}

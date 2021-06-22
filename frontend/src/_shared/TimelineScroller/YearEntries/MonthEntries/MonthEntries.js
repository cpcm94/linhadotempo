import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { EntryWithoutDayWrapper } from './EntryWithoutDayWrapper'
import { MonthWrapper } from './MonthWrapper'

export const MonthEntries = ({ timeEntriesByMonth }) => {
  const month = timeEntriesByMonth[0].month
  const entriesWithoutDay = timeEntriesByMonth.filter(
    (entry) => entry.day === null
  )

  const entriesWithDay = timeEntriesByMonth.filter(
    (entry) => entry.day !== null
  )

  const entriesGroupedByDay = entriesWithDay.reduce((r, a) => {
    r[a.day] = r[a.day] || []
    r[a.day].push(a)
    return r
  }, {})

  const arrayOfGroupedEntriesByDay = Object.entries(entriesGroupedByDay)
    .map((array) => array.splice(1))
    .flat()

  const filteredEntriesWithoutDay = entriesWithoutDay.length > 0

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper>
        <MonthWrapper>{filteredEntriesWithoutDay ? month : null}</MonthWrapper>
        <EntryWithoutDayWrapper>
          {filteredEntriesWithoutDay
            ? entriesWithoutDay.map((entries, index) => (
                <EntriesWithoutDay
                  key={index}
                  timeEntriesWithoutDay={entries}
                />
              ))
            : null}
        </EntryWithoutDayWrapper>
      </MonthAndEntryWrapper>
      <DayEntries timeEntriesByDay={arrayOfGroupedEntriesByDay} />
    </MonthEntriesWrapper>
  )
}

import React from 'react'
import {
  Wrapper,
  MonthEntriesWrapper,
  EntryWithoutDayWrapper,
  MonthWrapper,
  MonthAndEntryWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'

export const MonthEntries = ({ timeEntriesByMonth }) => {
  const month = timeEntriesByMonth[0].entry_month
  const entriesWithoutDay = timeEntriesByMonth.filter(
    (entry) => entry.entry_day === null
  )

  const entriesWithDay = timeEntriesByMonth.filter(
    (entry) => entry.entry_day !== null
  )

  const entriesGroupedByDay = entriesWithDay.reduce((r, a) => {
    r[a.entry_day] = r[a.entry_day] || []
    r[a.entry_day].push(a)
    return r
  }, {})

  const arrayOfGroupedEntriesByDay = Object.entries(entriesGroupedByDay)
    .map((array) => array.splice(1))
    .flat()

  const filteredEntriesWithoutDay = entriesWithoutDay.length > 0

  return (
    <Wrapper>
      <MonthEntriesWrapper>
        <MonthAndEntryWrapper>
          <MonthWrapper>
            {filteredEntriesWithoutDay ? month : null}
          </MonthWrapper>
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
    </Wrapper>
  )
}

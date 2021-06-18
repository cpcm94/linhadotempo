import React from 'react'
import {
  Wrapper,
  EntryNameWrapper,
  MonthEntriesWrapper,
  EntryWithoutDayWrapper,
  MonthWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'

export const MonthEntries = ({ timeEntriesByMonth }) => {
  const month = timeEntriesByMonth[0][0].entry_month

  const entriesWithoutDay = timeEntriesByMonth.map((month) =>
    month.filter((entry) => entry.entry_day === null)
  )

  const entriesWithDay = timeEntriesByMonth.map((month) =>
    month.filter((entry) => entry.entry_day !== null)
  )

  const entriesGroupedByDay = entriesWithDay.map((month) =>
    month.reduce((r, a) => {
      r[a.entry_day] = r[a.entry_day] || []
      r[a.entry_day].push(a)
      return r
    }, {})
  )

  const arrayOfGroupedEntriesByDay = entriesGroupedByDay
    .map((month) => Object.entries(month).map((array) => array.splice(1)))
    .flat(2)

  return (
    <Wrapper>
      <MonthWrapper>{entriesWithoutDay[0][0] ? month : null}</MonthWrapper>
      <MonthEntriesWrapper>
        <EntryWithoutDayWrapper>
          {entriesWithoutDay[0][0]
            ? entriesWithoutDay.map((month) =>
                month.map((entry, index) => (
                  <EntryNameWrapper key={index}>{entry.name}</EntryNameWrapper>
                ))
              )
            : null}
        </EntryWithoutDayWrapper>

        <DayEntries timeEntriesByDay={arrayOfGroupedEntriesByDay} />
      </MonthEntriesWrapper>
    </Wrapper>
  )
}

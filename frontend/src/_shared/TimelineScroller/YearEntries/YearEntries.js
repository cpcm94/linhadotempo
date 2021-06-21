import React from 'react'
import {
  Wrapper,
  EntryNameWrapper,
  EntryYearWrapper,
  EntriesWithoutMonthsWrapper,
  EntriesWrapper,
} from './YearEntries.styles'
import { MonthEntries } from './MonthEntries/MonthEntries'

export const YearEntries = ({ timeEntriesByYear }) => {
  const year = timeEntriesByYear[0].entry_year
  const entriesWithoutMonth = timeEntriesByYear.filter(
    (entry) => entry.entry_month === null
  )
  const entriesWithMonths = timeEntriesByYear.filter(
    (entry) => entry.entry_month !== null
  )

  const entriesGroupedByMonth = entriesWithMonths.reduce((r, a) => {
    r[a.entry_month] = r[a.entry_month] || []
    r[a.entry_month].push(a)
    return r
  }, {})

  const arrayOfGroupedEntriesByMonth = Object.entries(entriesGroupedByMonth)
    .map((array) => array.splice(1))
    .flat(1)

  return (
    <Wrapper>
      <EntryYearWrapper>{year}</EntryYearWrapper>
      <EntriesWrapper>
        <EntriesWithoutMonthsWrapper>
          {entriesWithoutMonth[0]
            ? entriesWithoutMonth.map((entry, index) => (
                <EntryNameWrapper key={index}>{entry.name}</EntryNameWrapper>
              ))
            : null}
        </EntriesWithoutMonthsWrapper>
        {arrayOfGroupedEntriesByMonth.map((month, index) => (
          <MonthEntries timeEntriesByMonth={month} key={index} />
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

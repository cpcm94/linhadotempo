import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameWrapper } from './YearEntries.styles'
import { Wrapper } from './Wrapper'
import { EntriesWrapper } from './EntriesWrapper'
import { EntryYearWrapper } from './EntryYearWrapper'
import { MonthEntries } from './MonthEntries/MonthEntries'
import { EntriesWithoutMonthsWrapper } from './EntriesWithoutMonthsWrapper'

export const YearEntries = ({ timeEntriesByYear }) => {
  const year = timeEntriesByYear[0].year
  const entriesWithoutMonth = timeEntriesByYear.filter(
    (entry) => entry.month === null
  )
  const entriesWithMonths = timeEntriesByYear.filter(
    (entry) => entry.month !== null
  )

  const entriesGroupedByMonth = entriesWithMonths.reduce((r, a) => {
    r[a.month] = r[a.month] || []
    r[a.month].push(a)
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

YearEntries.propTypes = {
  timeEntriesByYear: PropTypes.array,
}

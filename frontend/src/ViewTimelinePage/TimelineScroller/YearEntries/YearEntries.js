import React from 'react'
import PropTypes from 'prop-types'
import { EntriesWithoutMonths } from './EntriesWithoutMonths'
import { Wrapper } from './Wrapper'
import { EntriesWrapper } from './EntriesWrapper'
import { EntryYearWrapper } from './EntryYearWrapper'
import { MonthEntries } from './MonthEntries/MonthEntries'
import { EntriesWithoutMonthsWrapper } from './EntriesWithoutMonthsWrapper'
import { convertObjectToArray } from '../convertObjectToArray'
import { groupBy } from '../groupBy'
import { filterEntriesWithValue } from './filterEntriesWithValue'
import { filterEntriesWithoutValue } from './filterEntriesWithoutValue'

export const YearEntries = ({ timeEntriesByYear }) => {
  const year = timeEntriesByYear[0].year

  const entriesWithoutMonth = filterEntriesWithValue(timeEntriesByYear, 'month')

  const entriesWithMonths = filterEntriesWithoutValue(
    timeEntriesByYear,
    'month'
  )

  const entriesGroupedByMonth = groupBy(entriesWithMonths, 'month')

  const arrayOfGroupedEntriesByMonth = convertObjectToArray(
    entriesGroupedByMonth
  )

  return (
    <Wrapper>
      <EntryYearWrapper>{year}</EntryYearWrapper>
      <EntriesWrapper>
        <EntriesWithoutMonthsWrapper>
          <EntriesWithoutMonths entriesWithoutMonth={entriesWithoutMonth} />
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

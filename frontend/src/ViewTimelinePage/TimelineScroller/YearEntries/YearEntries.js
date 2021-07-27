import React from 'react'
import PropTypes from 'prop-types'
import { EntriesWithoutMonths } from './EntriesWithoutMonths'
import { MonthEntries } from './MonthEntries/MonthEntries'
import {
  EntriesWithoutMonthsWrapper,
  Wrapper,
  EntriesWrapper,
  EntryYearWrapper,
  YearWrapper,
} from './YearEntries.styles'
import { convertObjectToArray } from '../convertObjectToArray'
import { groupBy } from '../groupBy'
import { filterEntriesWithValue } from './filterEntriesWithValue'
import { filterEntriesWithoutValue } from './filterEntriesWithoutValue'

export const YearEntries = ({
  timeEntriesByYear,
  newEntryId,
  forwardedRef,
  displayEntry,
}) => {
  const year = timeEntriesByYear[0].year.toString().startsWith('-')
    ? `${timeEntriesByYear[0].year.toString().substr(1)} a.c.`
    : timeEntriesByYear[0].year.toString()
  const entriesWithoutMonth = filterEntriesWithValue(timeEntriesByYear, 'month')

  const entriesWithMonths = filterEntriesWithoutValue(
    timeEntriesByYear,
    'month'
  )

  const entriesGroupedByMonth = groupBy(entriesWithMonths, 'month')

  const arrayOfGroupedEntriesByMonth = convertObjectToArray(
    entriesGroupedByMonth
  )
  const isDisplayEntryYear =
    displayEntry && displayEntry.year === timeEntriesByYear[0].year

  const atLeastOneEntryWithoutMonth = entriesWithoutMonth[0] ? true : false

  return (
    <Wrapper>
      {atLeastOneEntryWithoutMonth && (
        <EntryYearWrapper isDisplayEntryYear={isDisplayEntryYear}>
          <YearWrapper>
            <span>{year}</span>
          </YearWrapper>
        </EntryYearWrapper>
      )}
      <EntriesWrapper>
        <EntriesWithoutMonthsWrapper>
          <EntriesWithoutMonths
            entriesWithoutMonth={entriesWithoutMonth}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
          />
        </EntriesWithoutMonthsWrapper>
        {arrayOfGroupedEntriesByMonth.map((month, index) => (
          <MonthEntries
            timeEntriesByMonth={month}
            key={index}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
            displayEntry={displayEntry}
            hasYear={atLeastOneEntryWithoutMonth}
          />
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

YearEntries.propTypes = {
  timeEntriesByYear: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}

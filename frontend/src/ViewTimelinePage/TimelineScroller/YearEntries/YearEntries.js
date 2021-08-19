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
  timelines,
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
  const entriesSortedByMonth = arrayOfGroupedEntriesByMonth.sort(
    (a, b) => b[0].month - a[0].month
  )
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryYear =
    isNotFirstEntry && displayEntry.year === timeEntriesByYear[0].year

  const atLeastOneEntryWithoutMonth = entriesWithoutMonth[0] ? true : false

  return (
    <Wrapper>
      <EntriesWrapper>
        {atLeastOneEntryWithoutMonth && (
          <>
            <EntryYearWrapper isDisplayEntryYear={isDisplayEntryYear}>
              <YearWrapper>
                <span>{year}</span>
              </YearWrapper>
            </EntryYearWrapper>
            <EntriesWithoutMonthsWrapper>
              <EntriesWithoutMonths
                entriesWithoutMonth={entriesWithoutMonth}
                newEntryId={newEntryId}
                forwardedRef={forwardedRef}
                timelines={timelines}
              />
            </EntriesWithoutMonthsWrapper>
          </>
        )}
        {entriesSortedByMonth.map((month, index) => (
          <MonthEntries
            timeEntriesByMonth={month}
            key={index}
            timelines={timelines}
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
  timelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}

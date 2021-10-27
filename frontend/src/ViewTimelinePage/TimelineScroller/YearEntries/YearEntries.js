import React from 'react'
import PropTypes from 'prop-types'
import { EntriesWithoutMonths } from './EntriesWithoutMonths'
import { MonthEntries } from './MonthEntries/MonthEntries'
import {
  Wrapper,
  EntriesWrapper,
  EntryYearWrapper,
  YearWrapper,
} from './YearEntries.styles'
import { convertObjectToArray } from '../../../_shared/convertObjectToArray'
import { filterEntriesWithValue } from './filterEntriesWithValue'
import { filterEntriesWithoutValue } from './filterEntriesWithoutValue'
import { groupBy } from '../../../_shared/groupBy'

export const YearEntries = ({
  timeEntriesByYear,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
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
            <EntriesWithoutMonths
              entriesWithoutMonth={entriesWithoutMonth}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
            />
          </>
        )}
        {entriesSortedByMonth.map((month, index) => (
          <MonthEntries
            timeEntriesByMonth={month}
            key={index}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
            displayEntry={displayEntry}
            visibleTimelines={visibleTimelines}
            bucketName={bucketName}
          />
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

YearEntries.propTypes = {
  timeEntriesByYear: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
}

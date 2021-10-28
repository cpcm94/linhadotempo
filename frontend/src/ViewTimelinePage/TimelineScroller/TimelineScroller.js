import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  EntriesWrapper,
  InvisibleIconWrapper,
  EntryWithoutYearLabelWrapper,
} from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { convertObjectToArray } from '../../_shared/convertObjectToArray'
import { groupBy } from '../../_shared/groupBy'
import { InvisibleIcon } from '../../_shared/InvisibleIcon'
import { MessageWrapper } from '../../_shared/MessageWrapper'
import { filterEntriesWithoutValue } from './YearEntries/filterEntriesWithoutValue'
import { filterEntriesWithValue } from './YearEntries/filterEntriesWithValue'
import { EntriesWithoutYear } from './EntriesWithoutYear'
import { PeriodEndWithoutYear } from './PeriodEndWithoutYear'
import { addPeriodEndEntries } from '../../_shared/addPeriodEndEntries'
import { filterRelevantPeriods } from '../../_shared/filterRelevantPeriods'

export const TimelineScroller = ({
  visibleTimelines,
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  bucketName,
}) => {
  const visibleTimelinesIds = visibleTimelines.map((timeline) => timeline.id)
  const filteredEntriesByVisibleTimelines = entries.filter((entry) =>
    entry.timelines
      .map((timeline) => timeline.id)
      .some((id) => visibleTimelinesIds.includes(id))
  )

  const filteredEntriesAndPeriodsByVisibleTimelines = addPeriodEndEntries(
    filteredEntriesByVisibleTimelines
  )
  const periods = convertObjectToArray(
    groupBy(
      filteredEntriesAndPeriodsByVisibleTimelines.filter(
        (entry) => entry.is_period
      ),
      'id'
    )
  ).map((subArray) =>
    subArray.map((entry) => {
      return {
        is_period: entry.is_period,
        period_end: !!entry.period_end,
        year: entry.year,
        month: entry.month,
        day: entry.day,
      }
    })
  )

  const entriesAndPeriodsWithoutYear = filterEntriesWithValue(
    filteredEntriesAndPeriodsByVisibleTimelines,
    'year'
  )
  const entriesWithoutYear = entriesAndPeriodsWithoutYear.filter(
    (entry) => !entry.period_end
  )
  const periodEndsWithoutYear = entriesAndPeriodsWithoutYear.filter(
    (entry) => entry.period_end
  )

  const entriesWithYear = filterEntriesWithoutValue(
    filteredEntriesAndPeriodsByVisibleTimelines,
    'year'
  )

  const entriesGroupedByYear = groupBy(entriesWithYear, 'year')

  const arrayOfGroupedEntries = convertObjectToArray(entriesGroupedByYear)

  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => b[0].year - a[0].year
  )

  return (
    <Wrapper>
      {visibleTimelines[0] ? (
        <EntriesWrapper>
          {periodEndsWithoutYear[0] && (
            <>
              <EntryWithoutYearLabelWrapper>
                <span>{'Períodos ainda ativos'}</span>
              </EntryWithoutYearLabelWrapper>
              <PeriodEndWithoutYear
                periodEndsWithoutYear={periodEndsWithoutYear}
                newEntryId={newEntryId}
                visibleTimelines={visibleTimelines}
                bucketName={bucketName}
              />
            </>
          )}
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries
              timeEntriesByYear={timeEntriesByYear}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
              periods={filterRelevantPeriods(
                periods,
                timeEntriesByYear[0].year,
                'year'
              )}
            />
          ))}
          {entriesWithoutYear[0] && (
            <>
              <EntryWithoutYearLabelWrapper>
                <span>{'Sem data definida'}</span>
              </EntryWithoutYearLabelWrapper>
              <EntriesWithoutYear
                entriesWithoutYear={entriesWithoutYear}
                newEntryId={newEntryId}
                forwardedRef={forwardedRef}
                visibleTimelines={visibleTimelines}
                bucketName={bucketName}
              />
            </>
          )}
        </EntriesWrapper>
      ) : (
        <>
          <InvisibleIconWrapper>
            <InvisibleIcon />
          </InvisibleIconWrapper>
          <MessageWrapper>Todas as linhas estão invisíveis.</MessageWrapper>
        </>
      )}
    </Wrapper>
  )
}

TimelineScroller.propTypes = {
  visibleTimelines: PropTypes.array,
  entries: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
}

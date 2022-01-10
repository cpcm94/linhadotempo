import React from 'react'
import PropTypes from 'prop-types'
import { EntriesWrapper, InvisibleIconWrapper } from './TimelineScroller.styles'
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
import { getPeriods } from '../../_shared/getPeriods'
import { getPeriodsPositions } from '../../_shared/getPeriodsPositions'

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
  const periods = getPeriods(filteredEntriesAndPeriodsByVisibleTimelines)
  const periodsWithPositions = getPeriodsPositions(periods)
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
    (a, b) => a[0].year - b[0].year
  )
  const periodsWithoutEndYear = periodsWithPositions.filter(
    (subArray) => !subArray[1].year
  )

  return (
    <>
      {visibleTimelines[0] ? (
        <EntriesWrapper>
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
                periodsWithPositions,
                timeEntriesByYear[0].year
              )}
            />
          ))}
          {periodEndsWithoutYear[0] && (
            <PeriodEndWithoutYear
              periodEndsWithoutYear={periodEndsWithoutYear}
              newEntryId={newEntryId}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
              periods={periodsWithoutEndYear}
            />
          )}
          {entriesWithoutYear[0] && (
            <EntriesWithoutYear
              entriesWithoutYear={entriesWithoutYear}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
            />
          )}
        </EntriesWrapper>
      ) : (
        <>
          <InvisibleIconWrapper>
            <MessageWrapper>Todas as linhas estão invisíveis.</MessageWrapper>
            <InvisibleIcon />
          </InvisibleIconWrapper>
        </>
      )}
    </>
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

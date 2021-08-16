import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  EntriesWrapper,
  InvisibleIconWrapper,
  SpanWrapper,
  EntryWithoutYearLabelWrapper,
} from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { convertObjectToArray } from './convertObjectToArray'
import { groupBy } from './groupBy'
import { InvisibleIcon } from '../../_shared/InvisibleIcon'
import { MessageWrapper } from '../../_shared/MessageWrapper'
import { filterEntriesWithoutValue } from './YearEntries/filterEntriesWithoutValue'
import { filterEntriesWithValue } from './YearEntries/filterEntriesWithValue'
import { EntriesWithoutYear } from './EntriesWithoutYear'

export const TimelineScroller = ({
  visibleTimelines,
  newEntryId,
  forwardedRef,
  displayEntry,
}) => {
  const timeEntries = visibleTimelines
    .map((timeline) => timeline.time_entries)
    .flat()

  const visibleTimelinesColorInitialsAndId = visibleTimelines.map(
    (timeline) => {
      return {
        id: timeline.id,
        color: timeline.color,
        initials: timeline.initials,
      }
    }
  )

  const entriesWithoutYear = filterEntriesWithValue(timeEntries, 'year')

  const entriesWithYear = filterEntriesWithoutValue(timeEntries, 'year')

  const entriesGroupedByYear = groupBy(entriesWithYear, 'year')

  const arrayOfGroupedEntries = convertObjectToArray(entriesGroupedByYear)

  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => b[0].year - a[0].year
  )

  return (
    <Wrapper>
      {visibleTimelines[0] ? (
        <EntriesWrapper>
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries
              timeEntriesByYear={timeEntriesByYear}
              timelines={visibleTimelinesColorInitialsAndId}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
            />
          ))}
          {entriesWithoutYear[0] && (
            <>
              <EntryWithoutYearLabelWrapper>
                <SpanWrapper>
                  <span>{'Sem data definida'}</span>
                </SpanWrapper>
              </EntryWithoutYearLabelWrapper>
              <EntriesWithoutYear
                entriesWithoutYear={entriesWithoutYear}
                newEntryId={newEntryId}
                forwardedRef={forwardedRef}
                timelines={visibleTimelinesColorInitialsAndId}
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
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}

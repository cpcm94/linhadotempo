import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  EntriesWrapper,
  InvisibleIconWrapper,
} from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { convertObjectToArray } from './convertObjectToArray'
import { groupBy } from './groupBy'
import { InvisibleIcon } from '../../_shared/InvisibleIcon'
import { MessageWrapper } from '../../_shared/MessageWrapper'

export const TimelineScroller = ({
  visibleTimelines,
  newEntryId,
  forwardedRef,
  displayEntry,
}) => {
  const timeEntries = visibleTimelines
    .map((timeline) => timeline.time_entries)
    .flat()

  const entriesGroupedByYear = groupBy(timeEntries, 'year')

  const arrayOfGroupedEntries = convertObjectToArray(entriesGroupedByYear)

  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => a[0].year - b[0].year
  )
  return (
    <Wrapper>
      {visibleTimelines[0] ? (
        <EntriesWrapper>
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries
              timeEntriesByYear={timeEntriesByYear}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
            />
          ))}
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

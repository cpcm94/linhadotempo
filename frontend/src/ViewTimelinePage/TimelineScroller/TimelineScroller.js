import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, EntriesWrapper } from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { Layout } from '../../_shared/Layout'
import { convertObjectToArray } from './convertObjectToArray'
import { groupBy } from './groupBy'

export const TimelineScroller = ({ visibleTimelines, newEntryId }) => {
  const timeEntries = visibleTimelines
    .map((timeline) => timeline.time_entries)
    .flat()

  const entriesGroupedByYear = groupBy(timeEntries, 'year')

  const arrayOfGroupedEntries = convertObjectToArray(entriesGroupedByYear)

  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => a[0].year - b[0].year
  )
  return (
    <Layout>
      <Wrapper>
        <EntriesWrapper>
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries
              timeEntriesByYear={timeEntriesByYear}
              key={index}
              newEntryId={newEntryId}
            />
          ))}
        </EntriesWrapper>
      </Wrapper>
    </Layout>
  )
}

TimelineScroller.propTypes = {
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
}

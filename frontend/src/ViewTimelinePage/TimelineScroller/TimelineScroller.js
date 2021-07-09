import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, EntriesWrapper } from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { Footer } from '../../_shared/Footer/Footer'
import { Layout } from '../../_shared/Layout'

export const TimelineScroller = ({ timelines }) => {
  const timeEntries = timelines.map((timeline) => timeline.time_entries).flat()

  const entriesGroupedByYear = timeEntries.reduce((r, a) => {
    r[a.year] = r[a.year] || []
    r[a.year].push(a)
    return r
  }, {})

  const arrayOfGroupedEntries = Object.entries(entriesGroupedByYear)
    .map((array) => array.splice(1))
    .flat()
  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => a[0].year - b[0].year
  )
  return (
    <Layout>
      <Wrapper>
        <EntriesWrapper>
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries timeEntriesByYear={timeEntriesByYear} key={index} />
          ))}
        </EntriesWrapper>
        <Footer />
      </Wrapper>
    </Layout>
  )
}

TimelineScroller.propTypes = {
  timelines: PropTypes.array,
}

import React from 'react'
import { Wrapper, EntriesWrapper } from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { Footer } from '../Footer/Footer'

export const TimelineScroller = ({ timelines }) => {
  const timeEntries = timelines.map((timeline) => timeline.time_entries).flat()

  const entriesGroupedByYear = timeEntries.reduce((r, a) => {
    r[a.entry_year] = r[a.entry_year] || []
    r[a.entry_year].push(a)
    return r
  }, {})

  const arrayOfGroupedEntries = Object.entries(entriesGroupedByYear)
    .map((array) => array.splice(1))
    .flat()

  return (
    <Wrapper>
      <EntriesWrapper>
        {arrayOfGroupedEntries.map((timeEntriesByYear, index) => (
          <YearEntries timeEntriesByYear={timeEntriesByYear} key={index} />
        ))}
      </EntriesWrapper>
      <Footer />
    </Wrapper>
  )
}

import React from 'react'
import { Wrapper, EntriesWrapper } from './TimelineScroller.styles'
import { sortByDate } from '../sortByDate'
import { TimeEntry } from './TimeEntry/TimeEntry'
import { Footer } from '../Footer/Footer'

export const TimelineScroller = ({ timelines }) => {
  const timeEntries = timelines.map((timeline) => timeline.time_entries).flat()

  const sortedTimeEntries = sortByDate(timeEntries)

  console.log('sortedTimeEntries', sortedTimeEntries)

  return (
    <Wrapper>
      <EntriesWrapper>
        {sortedTimeEntries.map((timeEntry) => (
          <TimeEntry timeEntry={timeEntry} />
        ))}
      </EntriesWrapper>
      <Footer />
    </Wrapper>
  )
}

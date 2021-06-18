import React from 'react'
import { Wrapper, DayEntriesWrapper } from './DayEntries.styles'
import { Entries } from './Entries/Entries'

export const DayEntries = ({ timeEntriesByDay }) => {
  return (
    <Wrapper>
      <DayEntriesWrapper>
        {timeEntriesByDay[0][0]
          ? timeEntriesByDay.map((entry, index) => (
              <Entries entries={entry} key={index} />
            ))
          : null}
      </DayEntriesWrapper>
    </Wrapper>
  )
}

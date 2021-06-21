import React from 'react'
import { DayEntriesWrapper } from './DayEntries.styles'
import { Entries } from './Entries/Entries'

export const DayEntries = ({ timeEntriesByDay }) => {
  return (
    <DayEntriesWrapper>
      {timeEntriesByDay[0]
        ? timeEntriesByDay.map((entry, index) => (
            <Entries entries={entry} key={index} />
          ))
        : null}
    </DayEntriesWrapper>
  )
}

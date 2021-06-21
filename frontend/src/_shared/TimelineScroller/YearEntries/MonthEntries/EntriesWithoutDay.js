import React from 'react'
import { Wrapper, EntryNameWrapper, EntryWrapper } from './MonthEntries.styles'

export const EntriesWithoutDay = ({ timeEntriesWithoutDay }) => {
  return (
    <Wrapper>
      <EntryWrapper>
        <EntryNameWrapper>{timeEntriesWithoutDay.name}</EntryNameWrapper>
      </EntryWrapper>
    </Wrapper>
  )
}

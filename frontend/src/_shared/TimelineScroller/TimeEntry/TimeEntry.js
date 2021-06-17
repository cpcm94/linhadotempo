import React from 'react'
import {
  Wrapper,
  EntryNameWrapper,
  EntryYearWrapper,
  EntryMonthDayWrapper,
} from './TimeEntry.styles'

export const TimeEntry = ({ timeEntry }) => {
  const entryYear = timeEntry.entry_date.substring(0, 4)
  const entryMonthDay = timeEntry.entry_date.substring(5).replace('-', '/')
  return (
    <Wrapper>
      <EntryYearWrapper>{entryYear}</EntryYearWrapper>
      <EntryMonthDayWrapper>{entryMonthDay}</EntryMonthDayWrapper>
      <EntryNameWrapper>{timeEntry.name}</EntryNameWrapper>
    </Wrapper>
  )
}

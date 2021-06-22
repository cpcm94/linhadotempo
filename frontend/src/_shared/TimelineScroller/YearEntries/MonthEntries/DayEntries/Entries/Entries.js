import React from 'react'
import { Wrapper } from './Wrapper'
import { EntriesWrapper } from './EntriesWrapper'
import { EntryDateWrapper } from './EntryDateWrapper'
import { EntryWrapper } from './EntryWrapper'

export const Entries = ({ entries }) => {
  const entryDate = `${entries[0].entry_day}/${entries[0].entry_month}`
  return (
    <Wrapper>
      <EntryDateWrapper>{entryDate}</EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry) => (
          <EntryWrapper>{entry.name}</EntryWrapper>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

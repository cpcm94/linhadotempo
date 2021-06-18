import React from 'react'
import { Wrapper, EntriesWrapper, EntryDateWrapper } from './Entries.styles'

export const Entries = ({ entries }) => {
  console.log('entries', entries)
  const entryDate = `${entries[0].entry_day}/${entries[0].entry_month}`
  return (
    <Wrapper>
      <EntryDateWrapper>{entryDate}</EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry) => (
          <div>{entry.name}</div>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

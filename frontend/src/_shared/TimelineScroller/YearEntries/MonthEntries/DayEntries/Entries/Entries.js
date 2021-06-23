import React from 'react'
import { Wrapper } from './Wrapper'
import { EntriesWrapper } from './EntriesWrapper'
import { EntryDateWrapper } from './EntryDateWrapper'
import { EntryWrapper } from './EntryWrapper'
import PropTypes from 'prop-types'

export const Entries = ({ entries }) => {
  const entryDate = `${entries[0].day}/${entries[0].month}`
  return (
    <Wrapper>
      <EntryDateWrapper>{entryDate}</EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryWrapper key={index}>{entry.name}</EntryWrapper>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

Entries.propTypes = {
  entries: PropTypes.array,
}

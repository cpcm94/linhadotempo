import React from 'react'
import { Wrapper } from './Wrapper'
import { EntriesWrapper } from './EntriesWrapper'
import { EntryDateWrapper } from './EntryDateWrapper'
import { EntryWrapper } from './EntryWrapper'
import { EntryAndIconWrapper } from '../../../EntryAndIconWrapper'
import { EntryIcon } from '../../../EntryIcon'
import PropTypes from 'prop-types'

export const Entries = ({ entries }) => {
  const entryDate = `${entries[0].day}/${entries[0].month}`
  return (
    <Wrapper>
      <EntryDateWrapper>{entryDate}</EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryAndIconWrapper key={index}>
            <EntryWrapper key={index}>{entry.name}</EntryWrapper>
            <EntryIcon>{entry.timeline_id}</EntryIcon>
          </EntryAndIconWrapper>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

Entries.propTypes = {
  entries: PropTypes.array,
}

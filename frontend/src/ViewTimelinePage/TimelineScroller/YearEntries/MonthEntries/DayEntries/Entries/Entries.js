import React from 'react'
import {
  Wrapper,
  EntriesWrapper,
  EntryDateWrapper,
  EntryWrapper,
} from './Entries.styles'
import { EntryAndIconWrapper, EntryIcon } from '../../../YearEntries.styles'
import PropTypes from 'prop-types'

export const Entries = ({ entries, newEntryId }) => {
  const entryDate = `${entries[0].day}`

  return (
    <Wrapper>
      <EntryDateWrapper>
        <span>{entryDate}</span>
      </EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryAndIconWrapper
            key={index}
            isNew={newEntryId === entry.id}
            id={entry.id}
          >
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
  newEntryId: PropTypes.string,
}

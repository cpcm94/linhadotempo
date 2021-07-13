import React from 'react'
import { Wrapper } from './Wrapper'
import { EntriesWrapper } from './EntriesWrapper'
import { EntryDateWrapper } from './EntryDateWrapper'
import { EntryWrapper } from './EntryWrapper'
import { EntryAndIconWrapper } from '../../../EntryAndIconWrapper'
import { EntryIcon } from '../../../EntryIcon'
import { monthNameArray } from '../../monthNameArray'
import PropTypes from 'prop-types'

export const Entries = ({ entries, newEntryId }) => {
  const entryDate = `${entries[0].day}/${monthNameArray[entries[0].month]}`
  return (
    <Wrapper>
      <EntryDateWrapper>{entryDate}</EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryAndIconWrapper key={index} isNew={newEntryId === entry.id}>
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

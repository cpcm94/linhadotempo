import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameWrapper } from './EntryNameWrapper'
import { EntryIcon } from '../EntryIcon'
import { EntryAndIconWrapper } from '../EntryAndIconWrapper'

export const EntriesWithoutDay = ({ timeEntriesWithoutDay }) => {
  return (
    <>
      {timeEntriesWithoutDay[0]
        ? timeEntriesWithoutDay.map((entry, index) => (
            <EntryAndIconWrapper key={index}>
              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              <EntryIcon>{entry.timeline_id}</EntryIcon>
            </EntryAndIconWrapper>
          ))
        : null}
    </>
  )
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.array,
}

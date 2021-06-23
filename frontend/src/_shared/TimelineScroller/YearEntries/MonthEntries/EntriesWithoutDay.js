import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameWrapper } from './EntryNameWrapper'

export const EntriesWithoutDay = ({ timeEntriesWithoutDay }) => {
  return <EntryNameWrapper>{timeEntriesWithoutDay.name}</EntryNameWrapper>
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.object,
}

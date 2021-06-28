import React from 'react'
import { EntryIcon } from './EntryIcon'
import { EntryNameWrapper } from './EntryNameWrapper'
import { EntryAndIconWrapper } from './EntryAndIconWrapper'
import { FormattingWrapper } from './FormattingWrapper'
import PropTypes from 'prop-types'

export const EntriesWithoutMonths = ({ entriesWithoutMonth }) => {
  console.log('entriesWithoutMonth', entriesWithoutMonth)
  return (
    <>
      {entriesWithoutMonth[0]
        ? entriesWithoutMonth.map((entry, index) => (
            <EntryAndIconWrapper key={index}>
              <FormattingWrapper />
              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              <EntryIcon>{entry.timeline_id}</EntryIcon>
            </EntryAndIconWrapper>
          ))
        : null}
    </>
  )
}

EntriesWithoutMonths.propTypes = {
  entriesWithoutMonth: PropTypes.array,
}

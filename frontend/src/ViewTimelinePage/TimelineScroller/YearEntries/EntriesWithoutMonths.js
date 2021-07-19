import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
} from './YearEntries.styles'

import PropTypes from 'prop-types'

export const EntriesWithoutMonths = ({
  entriesWithoutMonth,
  newEntryId,
  forwardedRef,
}) => {
  return (
    <>
      {entriesWithoutMonth[0]
        ? entriesWithoutMonth.map((entry, index) => {
            return (
              <EntryAndIconWrapper
                key={index}
                isNew={newEntryId === entry.id}
                id={entry.id}
                ref={forwardedRef[entry.id]}
              >
                <EntryNameWrapper>{entry.name}</EntryNameWrapper>
                <EntryIcon>{entry.timeline_id}</EntryIcon>
              </EntryAndIconWrapper>
            )
          })
        : null}
    </>
  )
}

EntriesWithoutMonths.propTypes = {
  entriesWithoutMonth: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
}

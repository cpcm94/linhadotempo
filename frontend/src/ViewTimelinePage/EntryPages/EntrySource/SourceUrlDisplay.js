import React from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, SourceUrlDisplayWrapper } from './EntrySource.styles'

export const SourceUrlDisplay = ({ entry, changeEntry, showSiteDisplay }) => {
  return (
    <>
      {showSiteDisplay && (
        <SourceUrlDisplayWrapper>
          <StyledTextField
            type="text"
            variant="outlined"
            label="Fonte"
            value={entry.source_url}
            onChange={changeEntry('source_url')}
          />
        </SourceUrlDisplayWrapper>
      )}
    </>
  )
}

SourceUrlDisplay.propTypes = {
  entry: PropTypes.object,
  changeEntry: PropTypes.func,
  showSiteDisplay: PropTypes.bool,
}

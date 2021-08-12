import React, { useState } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { Entry } from './Entry'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: calc(100% - 2.5rem);
`

export const ImportInput = ({ timelineId }) => {
  const [importText, setImportText] = useState('')

  const splitString = importText
    .replaceAll('\r', '')
    .replaceAll('\n', '')
    .split('\t')

  const splitArrayIntoChunksOfLen = (arr, len) => {
    var chunks = [],
      i = 0,
      n = arr.length
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)))
    }
    return chunks
  }
  const arraySplitIntoStringEntries = splitArrayIntoChunksOfLen(splitString, 4)
    .slice(1)
    .filter((chunk) => chunk.length === 4)

  const arrayOfEntries = arraySplitIntoStringEntries.map((subArray) =>
    subArray.reduce((accumulator, currentValue, index) => {
      if (index === 0) accumulator['name'] = currentValue
      if (index === 1) accumulator['year'] = currentValue
      if (index === 2) accumulator['month'] = currentValue
      if (index === 3) accumulator['day'] = currentValue

      return accumulator
    }, {})
  )

  return (
    <Wrapper>
      <TextareaAutosize
        value={importText}
        style={{ width: '100%' }}
        onChange={(e) => setImportText(e.target.value)}
      />
      {arrayOfEntries[0] &&
        arrayOfEntries.map((entry, index) => (
          <Entry entry={entry} key={index} timelineId={timelineId} />
        ))}
    </Wrapper>
  )
}

ImportInput.propTypes = {
  timelineId: PropTypes.string,
}

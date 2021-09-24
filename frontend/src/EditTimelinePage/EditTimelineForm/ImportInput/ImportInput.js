import React, { useState } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { Entry } from './Entry/Entry'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../../_shared/colors'
import { splitArrayIntoChunksOfLength } from './splitArrayIntoChunksOfLength'

const Wrapper = styled.div`
  width: calc(100% - 2.5rem);
`

export const ImportInput = ({ timeline }) => {
  const [importText, setImportText] = useState('')

  const splitString = importText
    .replaceAll('\r', '\t')
    .replaceAll('\n', '\t')
    .split('\t')

  const arraySplitIntoStringEntries = splitArrayIntoChunksOfLength(
    splitString,
    4
  ).filter((chunk) => chunk.length === 4)

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
        style={{
          width: '100%',
          border: `solid 1px ${colors.brown}`,
          borderRadius: '5px',
        }}
        onChange={(e) => setImportText(e.target.value)}
      />
      {arrayOfEntries[0] &&
        arrayOfEntries.map((entry, index) => (
          <Entry entry={entry} key={index} timeline={timeline} />
        ))}
    </Wrapper>
  )
}

ImportInput.propTypes = {
  timeline: PropTypes.object,
}

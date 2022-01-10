import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  InputAndMicWrapper,
  MicWrapper,
} from './EntryDescriptionInput.styles'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { SpeechToText } from '../../../_shared/SpeechToText/SpeechToText'

export const EntryDescriptionInput = ({ entry, setEntry, resetField }) => {
  const changeDescription = (text, append = false) =>
    setEntry({
      ...entry,
      description: append ? `${entry.description} ${text}` : text,
    })

  return (
    <>
      <SectionTitle
        title={'Descrição'}
        resetSection={resetField('description')}
      />
      <InputAndMicWrapper>
        <Input
          id="description"
          type="text"
          value={entry.description}
          onChange={(e) => changeDescription(e.target.value)}
        />
        <MicWrapper>
          <SpeechToText
            onTextChange={(text) => changeDescription(text, true)}
          />
        </MicWrapper>
      </InputAndMicWrapper>
    </>
  )
}

EntryDescriptionInput.propTypes = {
  entry: PropTypes.object,
  resetField: PropTypes.func,
  setEntry: PropTypes.func,
}

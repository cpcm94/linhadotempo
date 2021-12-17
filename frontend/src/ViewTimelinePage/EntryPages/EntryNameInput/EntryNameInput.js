import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputAndMicWrapper } from './EntryNameInput.styles'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'
import { SpeechToName } from './SpeechToName/SpeechToName'

export const EntryNameInput = ({ entry, setEntry, entryError, resetField }) => {
  const showErrorMessage = entryError && entryError.field === 'name'
  const changeName = (newName) => {
    const newEntry = { ...entry }
    newEntry.name = newName
    setEntry(newEntry)
  }
  return (
    <>
      <SectionTitle title={'Acontecimento'} resetSection={resetField('name')} />
      {showErrorMessage && (
        <ErrorMessage>
          {entryError.error === 'emptyName'
            ? 'Não é possível criar acontecimento sem nome'
            : 'Nome do acontecimento está com tamanho acima do limite!'}
        </ErrorMessage>
      )}
      <InputAndMicWrapper>
        <Input
          id="name"
          type="text"
          value={entry.name}
          onChange={(e) => changeName(e.target.value)}
        />
        <SpeechToName changeName={changeName} entryName={entry.name} />
      </InputAndMicWrapper>
    </>
  )
}

EntryNameInput.propTypes = {
  entry: PropTypes.object,
  resetField: PropTypes.func,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  setEntry: PropTypes.func,
}

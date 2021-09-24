import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage, Input } from './EntryTextInput.styles'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'

export const EntryTextInput = ({
  entry,
  changeEntry,
  entryError,
  title,
  resetField,
  field,
}) => {
  const showErrorMessage = entryError && entryError.field === 'name'
  return (
    <>
      <SectionTitle title={title} resetSection={resetField(field)} />
      {showErrorMessage && (
        <ErrorMessage>
          {entryError.error === 'emptyName'
            ? 'Não é possível criar acontecimento sem nome'
            : 'Nome do acontecimento está com tamanho acima do limite!'}
        </ErrorMessage>
      )}
      <Input
        id={field}
        type="text"
        value={entry[field]}
        onChange={changeEntry(field)}
      />
    </>
  )
}

EntryTextInput.propTypes = {
  entry: PropTypes.object,
  changeEntry: PropTypes.func,
  resetField: PropTypes.func,
  title: PropTypes.string,
  field: PropTypes.string,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

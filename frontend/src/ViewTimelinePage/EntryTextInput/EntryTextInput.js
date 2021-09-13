import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './EntryTextInput.styles'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'

export const EntryTextInput = ({
  entry,
  changeEntry,
  title,
  resetField,
  field,
}) => {
  return (
    <>
      <SectionTitle title={title} resetSection={resetField(field)} />
      <Input type="text" value={entry[field]} onChange={changeEntry(field)} />
    </>
  )
}

EntryTextInput.propTypes = {
  entry: PropTypes.object,
  changeEntry: PropTypes.func,
  resetField: PropTypes.func,
  title: PropTypes.string,
  field: PropTypes.string,
}

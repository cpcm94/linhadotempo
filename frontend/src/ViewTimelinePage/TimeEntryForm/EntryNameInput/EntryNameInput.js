import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './EntryNameInput.styles'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export const EntryNameInput = ({ entryName, changeEntryName, resetName }) => {
  return (
    <>
      <SectionTitle title={'Acontecimento'} resetSection={resetName('name')} />
      <div>
        <Input
          type="text"
          value={entryName}
          onChange={changeEntryName('name')}
        />
      </div>
    </>
  )
}

EntryNameInput.propTypes = {
  entryName: PropTypes.string,
  changeEntryName: PropTypes.func,
  resetName: PropTypes.func,
}

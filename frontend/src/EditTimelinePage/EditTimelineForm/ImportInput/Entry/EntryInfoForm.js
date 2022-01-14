import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameInput } from '../../../../ViewTimelinePage/EntryPages/EntryNameInput/EntryNameInput'
import { DateDisplay } from '../../../../ViewTimelinePage/EntryPages/DateDisplay/DateDisplay'

export const EntryInfoForm = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
}) => {
  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }
  return (
    <>
      <EntryNameInput
        entry={entry}
        setEntry={setEntry}
        resetField={resetFieldValue}
      />
      <DateDisplay
        entry={entry}
        setEntry={setEntry}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      />
    </>
  )
}

EntryInfoForm.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
}

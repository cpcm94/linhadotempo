import React from 'react'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import {
  CheckBoxWrapper,
  LabelCheckBoxWrapper,
  Label,
} from './EntryAnnualImportance.styles'
import PropTypes from 'prop-types'

export const EntryAnnualImportance = ({ entry, setEntry }) => {
  const onClick = () => {
    const newEntry = { ...entry }
    newEntry.annual_importance = !entry.annual_importance
    setEntry(newEntry)
  }
  return (
    <>
      <SectionTitle title={'Importância'} />
      <LabelCheckBoxWrapper>
        {entry.annual_importance ? (
          <CheckBoxWrapper onClick={onClick} selected={true}>
            &#10003;
          </CheckBoxWrapper>
        ) : (
          <CheckBoxWrapper onClick={onClick} />
        )}
        <Label>Importância Anual</Label>
      </LabelCheckBoxWrapper>
    </>
  )
}

EntryAnnualImportance.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
}

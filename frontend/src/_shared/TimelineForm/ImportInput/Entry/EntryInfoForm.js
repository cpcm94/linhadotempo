import React from 'react'
import PropTypes from 'prop-types'
import { monthNameArray } from '../../../monthNameArray'
import {
  StyledTextField,
  StyledYearTextField,
  YearAndRadiosWrapper,
  MonthWrapper,
  DayWrapper,
} from './EntryInfoForm.styles'
import { YearOptionSelect } from '../../../YearOptionSelect'
import MenuItem from '@material-ui/core/MenuItem'
import { XIcon } from '../../../XIcon'
import { Months, Days } from '../../../DateArrays'

const handleChange = (entryPropName, entry, setEntry) => (e) => {
  const newEntry = { ...entry }
  newEntry[entryPropName] = e.target.value
  setEntry(newEntry)
}

const resetFieldValue = (fieldName, entry, setEntry) => () => {
  const newEntry = { ...entry }
  newEntry[fieldName] = ''
  setEntry(newEntry)
}

export const EntryInfoForm = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
}) => {
  return (
    <>
      <StyledTextField
        type="text"
        variant="outlined"
        label="Nome"
        value={entry.name}
        onChange={handleChange('name', entry, setEntry)}
      />
      <YearAndRadiosWrapper>
        <StyledYearTextField
          type="number"
          variant="outlined"
          label="Ano"
          value={entry.year}
          onChange={handleChange('year', entry, setEntry)}
        />
        <YearOptionSelect
          setRadioValue={setRadioValue}
          radioValue={radioValue}
        />
      </YearAndRadiosWrapper>
      <MonthWrapper>
        <StyledTextField
          select
          variant="outlined"
          label="Mês"
          value={entry.month}
          onChange={handleChange('month', entry, setEntry)}
        >
          <MenuItem value={''}>{''}</MenuItem>
          {Months.map((month, index) => (
            <MenuItem key={index} value={month}>
              {monthNameArray[month]}
            </MenuItem>
          ))}
        </StyledTextField>
        {entry.month !== '' && (
          <XIcon onClick={resetFieldValue('month', entry, setEntry)} />
        )}
      </MonthWrapper>
      <DayWrapper>
        <StyledTextField
          select
          variant="outlined"
          label="Dia"
          value={entry.day}
          onChange={handleChange('day', entry, setEntry)}
        >
          <MenuItem value={''}>{''}</MenuItem>
          {Days.map((day, index) => (
            <MenuItem key={index} value={day}>
              {day}
            </MenuItem>
          ))}
        </StyledTextField>
        {entry.day !== '' && (
          <XIcon onClick={resetFieldValue('day', entry, setEntry)} />
        )}
      </DayWrapper>
    </>
  )
}

EntryInfoForm.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
}

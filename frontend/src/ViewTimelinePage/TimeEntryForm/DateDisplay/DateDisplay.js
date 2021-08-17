import React, { useState } from 'react'
import { DaySelector } from '../DaySelector/DaySelector'
import { MonthSelector } from '../MonthSelector/MonthSelector'
import { YearField } from '../YearField/YearField'
import PropTypes from 'prop-types'
import { DateSpan, DateWrapper } from './DateDisplay.styles'
import { monthNameArray } from '../../../_shared/monthNameArray'

export const DateDisplay = ({ entry, setEntry, radioValue, setRadioValue }) => {
  const [showDayPicker, setShowDayPicker] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)

  const displayDatePicker = (dateInfo) => {
    if (dateInfo === 'day') {
      setShowDayPicker(!showDayPicker)
      setShowMonthPicker(false)
      setShowYearPicker(false)
    }
    if (dateInfo === 'month') {
      setShowDayPicker(false)
      setShowMonthPicker(!showMonthPicker)
      setShowYearPicker(false)
    }
    if (dateInfo === 'year') {
      setShowDayPicker(false)
      setShowMonthPicker(false)
      setShowYearPicker(!showYearPicker)
    }
  }

  const handleChange = (entryPropName) => (e) => {
    const newEntry = { ...entry }
    newEntry[entryPropName] = e.target.value
    setEntry(newEntry)
  }

  const setYear = (year) => {
    const newEntry = { ...entry }
    newEntry.year = year
    setEntry(newEntry)
  }
  const handleMonthChange = (month) => (e) => {
    e.preventDefault()
    const newEntry = { ...entry }
    newEntry.month = month
    setEntry(newEntry)
  }

  const handleDayChange = (day) => (e) => {
    e.preventDefault()
    const newEntry = { ...entry }
    newEntry.day = day
    setEntry(newEntry)
  }

  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }
  const checkIfEmptyString = (string) => string.toString().trim() === ''
  return (
    <>
      <DateWrapper>
        <DateSpan onClick={() => displayDatePicker('day')}>
          {checkIfEmptyString(entry.day) ? 'Dia' : entry.day}
        </DateSpan>
        /
        <DateSpan onClick={() => displayDatePicker('month')}>
          {checkIfEmptyString(entry.month)
            ? 'Mês'
            : monthNameArray[entry.month]}
        </DateSpan>
        /
        <DateSpan onClick={() => displayDatePicker('year')}>
          {checkIfEmptyString(entry.year) ? 'Ano' : entry.year}
        </DateSpan>
      </DateWrapper>
      {showYearPicker && (
        <YearField
          changeYear={handleChange}
          setYear={setYear}
          resetYear={resetFieldValue}
          year={entry.year}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
      )}
      {showMonthPicker && (
        <MonthSelector
          selectedMonth={entry.month}
          changeMonth={handleMonthChange}
          resetMonth={resetFieldValue}
        />
      )}
      {showDayPicker && (
        <DaySelector
          selectedDay={entry.day}
          changeDay={handleDayChange}
          resetDay={resetFieldValue}
        />
      )}
    </>
  )
}

DateDisplay.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
}

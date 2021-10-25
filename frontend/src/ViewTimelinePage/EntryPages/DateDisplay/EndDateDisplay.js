import React, { useState } from 'react'
import { DateSpan, DateWrapper } from './DateDisplay.styles'
import { DaySelector } from './DaySelector/DaySelector'
import { MonthSelector } from './MonthSelector/MonthSelector'
import { ResetFieldButton } from './ResetFieldButton'
import { YearField } from './YearField/YearField'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'

export const EndDateDisplay = () => {
  const [showEndDateDisplay, setShowEndDateDisplay] = useState(false)
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
    newEntry.end_year = year
    setEntry(newEntry)
  }
  const handleMonthChange = (month) => (e) => {
    e.preventDefault()
    const newEntry = { ...entry }
    newEntry.end_month = month
    setEntry(newEntry)
    displayDatePicker('month')
  }

  const handleDayChange = (day) => (e) => {
    e.preventDefault()
    const newEntry = { ...entry }
    newEntry.end_day = day
    setEntry(newEntry)
    displayDatePicker('day')
  }

  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }
  const resetAllDateFieldValues = () => {
    const newEntry = { ...entry }
    newEntry.end_day = ''
    newEntry.end_month = ''
    newEntry.end_year = ''
    setEntry(newEntry)
  }
  const checkIfEmptyString = (string) => string.toString().trim() === ''

  const showErrorMessage = entryError && entryError.field === 'date'
  return (
    <>
      {!showEndDateDisplay && (
        <div onClick={() => setShowEndDateDisplay(true)}>
          Inserir data final e transformar em período
        </div>
      )}
      {showEndDateDisplay && (
        <>
          <SectionTitle
            title={'Final do período'}
            resetSection={resetAllDateFieldValues}
          />
          {showErrorMessage && (
            <ErrorMessage>
              {entryError.error === 'dayWithoutYearOrMonth'
                ? 'Não é possível criar acontecimento com dia sem possuir mês e ano'
                : 'Não é possível criar acontecimento com mês sem possuir ano'}
            </ErrorMessage>
          )}
          <DateWrapper id={fieldId}>
            <DateSpan
              selected={showDayPicker}
              isEmpty={checkIfEmptyString(entry.end_day)}
              onClick={() => displayDatePicker('day')}
            >
              {checkIfEmptyString(entry.end_day) ? 'dia' : entry.end_day}
              {showDayPicker && (
                <ResetFieldButton resetField={resetFieldValue('end_day')} />
              )}
            </DateSpan>
            /
            <DateSpan
              selected={showMonthPicker}
              isEmpty={checkIfEmptyString(entry.end_month)}
              onClick={() => displayDatePicker('month')}
            >
              {checkIfEmptyString(entry.end_month)
                ? 'mês'
                : monthNameArray[entry.end_month]}
              {showMonthPicker && (
                <ResetFieldButton resetField={resetFieldValue('end_month')} />
              )}
            </DateSpan>
            /
            <DateSpan
              selected={showYearPicker}
              isEmpty={checkIfEmptyString(entry.end_year)}
              onClick={() => displayDatePicker('year')}
            >
              {checkIfEmptyString(entry.end_year) ? 'ano' : entry.end_year}
              {showYearPicker && (
                <ResetFieldButton resetField={resetFieldValue('end_year')} />
              )}
            </DateSpan>
          </DateWrapper>
          {showYearPicker && (
            <YearField
              changeYear={handleChange}
              setYear={setYear}
              year={entry.end_year}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
              displayDatePicker={() => displayDatePicker('end_year')}
            />
          )}
          {showMonthPicker && (
            <MonthSelector
              selectedMonth={entry.end_month}
              changeMonth={handleMonthChange}
            />
          )}
          {showDayPicker && (
            <DaySelector
              selectedDay={entry.end_day}
              changeDay={handleDayChange}
            />
          )}
        </>
      )}
    </>
  )
}

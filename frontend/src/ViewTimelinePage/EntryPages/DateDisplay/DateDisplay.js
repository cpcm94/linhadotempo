import React, { useState } from 'react'
import { DaySelector } from './DaySelector/DaySelector'
import { MonthSelector } from './MonthSelector/MonthSelector'
import { YearField } from './YearField/YearField'
import PropTypes from 'prop-types'
import {
  DateSpan,
  DateWrapper,
  EllipsisWrapper,
  InnerDateWrapper,
} from './DateDisplay.styles'
import { monthNameArray } from '../../../_shared/monthNameArray'
import { ResetFieldButton } from './ResetFieldButton'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'
import { EndDateDisplay } from './EndDateDisplay'
import { SpeechDateToText } from './SpeechDateToText/SpeechDateToText'

export const DateDisplay = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
  fieldId,
  entryError,
}) => {
  const [showEndDateDisplay, setShowEndDateDisplay] = useState(false)
  const [showDayPicker, setShowDayPicker] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [enableSpeechToText, setEnableSpeechToText] = useState({
    dateDisplayMic: false,
    endDateDisplayMic: false,
  })
  const anyDatePickerOpen = showDayPicker || showMonthPicker || showYearPicker

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
    displayDatePicker('month')
  }

  const handleDayChange = (day) => (e) => {
    e.preventDefault()
    const newEntry = { ...entry }
    newEntry.day = day
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
    newEntry.day = ''
    newEntry.month = ''
    newEntry.year = ''
    setEntry(newEntry)
  }

  const checkIfEmptyString = (string) => string.toString().trim() === ''

  const showErrorMessage = entryError && entryError.field === 'date'

  const showEllipsisButton = !showEndDateDisplay && entry.year !== ''

  return (
    <>
      <SectionTitle title={'Data'} resetSection={resetAllDateFieldValues} />
      {showErrorMessage && (
        <ErrorMessage>
          {entryError.error === 'dayWithoutYearOrMonth'
            ? 'Não é possível criar acontecimento com dia sem possuir mês e ano'
            : 'Não é possível criar acontecimento com mês sem possuir ano'}
        </ErrorMessage>
      )}
      <DateWrapper id={fieldId}>
        <InnerDateWrapper>
          <DateSpan
            selected={showDayPicker}
            isEmpty={checkIfEmptyString(entry.day)}
            onClick={() => displayDatePicker('day')}
          >
            {checkIfEmptyString(entry.day) ? 'dia' : entry.day}
            {showDayPicker && (
              <ResetFieldButton resetField={resetFieldValue('day')} />
            )}
          </DateSpan>
          /
          <DateSpan
            selected={showMonthPicker}
            isEmpty={checkIfEmptyString(entry.month)}
            onClick={() => displayDatePicker('month')}
          >
            {checkIfEmptyString(entry.month)
              ? 'mês'
              : monthNameArray[entry.month]}
            {showMonthPicker && (
              <ResetFieldButton resetField={resetFieldValue('month')} />
            )}
          </DateSpan>
          /
          <DateSpan
            selected={showYearPicker}
            isEmpty={checkIfEmptyString(entry.year)}
            onClick={() => displayDatePicker('year')}
          >
            {checkIfEmptyString(entry.year) ? 'ano' : entry.year}
            {showYearPicker && (
              <ResetFieldButton resetField={resetFieldValue('year')} />
            )}
          </DateSpan>
          {showEllipsisButton && (
            <EllipsisWrapper onClick={() => setShowEndDateDisplay(true)}>
              ...
            </EllipsisWrapper>
          )}
        </InnerDateWrapper>
        {!anyDatePickerOpen && (
          <SpeechDateToText
            entry={entry}
            setEntry={setEntry}
            enableSpeechToText={enableSpeechToText}
            setEnableSpeechToText={setEnableSpeechToText}
          />
        )}
      </DateWrapper>
      {showYearPicker && (
        <YearField
          setYear={setYear}
          year={entry.year}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
          displayDatePicker={() => displayDatePicker('year')}
        />
      )}
      {showMonthPicker && (
        <MonthSelector
          selectedMonth={entry.month}
          changeMonth={handleMonthChange}
        />
      )}
      {showDayPicker && (
        <DaySelector selectedDay={entry.day} changeDay={handleDayChange} />
      )}
      <EndDateDisplay
        fieldId={'endDate'}
        entryError={entryError}
        entry={entry}
        setEntry={setEntry}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
        showMessageTrigger={showEndDateDisplay}
        setShowMessageTrigger={setShowEndDateDisplay}
        enableSpeechToText={enableSpeechToText}
        setEnableSpeechToText={setEnableSpeechToText}
      />
    </>
  )
}

DateDisplay.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  fieldId: PropTypes.string,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

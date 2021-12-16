import React, { useEffect, useState } from 'react'
import {
  DateSpan,
  DateWrapper,
  InnerDateWrapper,
  PeriodMessage,
} from './DateDisplay.styles'
import { DaySelector } from './DaySelector/DaySelector'
import { MonthSelector } from './MonthSelector/MonthSelector'
import { ResetFieldButton } from './ResetFieldButton'
import { YearField } from './YearField/YearField'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'
import PropTypes from 'prop-types'
import { monthNameArray } from '../../../_shared/monthNameArray'
import { SpeechEndDateToText } from './SpeechDateToText/SpeechEndDateToText'

const errorMessage = (error) => {
  if (error === 'dayWithoutYearOrMonthPeriod') {
    return 'Não é possível criar período com dia sem possuir mês e ano'
  } else if (error === 'monthWithoutYearPeriod') {
    return 'Não é possível criar acontecimento com mês sem possuir ano'
  } else if (error === 'periodWithoutStartYear') {
    return 'Não é possível salvar um período sem o ano inicial'
  }
}

export const EndDateDisplay = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
  fieldId,
  entryError,
  showMessageTrigger,
  setShowMessageTrigger,
  enableSpeechToText,
  setEnableSpeechToText,
}) => {
  const [showEndDateDisplay, setShowEndDateDisplay] = useState(entry.is_period)
  const [showDayPicker, setShowDayPicker] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)

  const displayDatePicker = (dateInfo) => {
    if (dateInfo === 'end_day') {
      setShowDayPicker(!showDayPicker)
      setShowMonthPicker(false)
      setShowYearPicker(false)
    }
    if (dateInfo === 'end_month') {
      setShowDayPicker(false)
      setShowMonthPicker(!showMonthPicker)
      setShowYearPicker(false)
    }
    if (dateInfo === 'end_year') {
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

  const turnIntoPeriod = () => {
    const newEntry = { ...entry }
    newEntry.is_period = true
    setEntry(newEntry)
    setShowEndDateDisplay(true)
  }
  const turnIntoNonPeriod = () => {
    const newEntry = { ...entry }
    newEntry.is_period = false
    setEntry(newEntry)
    setShowEndDateDisplay(false)
  }
  const checkIfEmptyString = (string) => string.toString().trim() === ''

  const showErrorMessage = entryError && entryError.field === 'endDate'

  const showPeriodTrigger =
    entry.year && !showEndDateDisplay && showMessageTrigger

  useEffect(() => {
    if (showEndDateDisplay) {
      setShowMessageTrigger(true)
    }
  }, [setShowMessageTrigger, showEndDateDisplay])

  const anyDatePickerOpen = showDayPicker || showMonthPicker || showYearPicker

  return (
    <>
      {showPeriodTrigger && (
        <PeriodMessage onClick={turnIntoPeriod}>
          Inserir data final e transformar em período
        </PeriodMessage>
      )}
      {showEndDateDisplay && (
        <>
          <SectionTitle
            title={'Final do período'}
            resetSection={resetAllDateFieldValues}
          />
          {showErrorMessage && (
            <ErrorMessage>{errorMessage(entryError.error)}</ErrorMessage>
          )}
          <DateWrapper id={fieldId}>
            <InnerDateWrapper>
              <DateSpan
                selected={showDayPicker}
                isEmpty={checkIfEmptyString(entry.end_day)}
                onClick={() => displayDatePicker('end_day')}
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
                onClick={() => displayDatePicker('end_month')}
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
                onClick={() => displayDatePicker('end_year')}
              >
                {checkIfEmptyString(entry.end_year) ? 'ano' : entry.end_year}
                {showYearPicker && (
                  <ResetFieldButton resetField={resetFieldValue('end_year')} />
                )}
              </DateSpan>
            </InnerDateWrapper>
            {!anyDatePickerOpen && (
              <SpeechEndDateToText
                entry={entry}
                setEntry={setEntry}
                enableSpeechToText={enableSpeechToText}
                setEnableSpeechToText={setEnableSpeechToText}
              />
            )}
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
          <PeriodMessage onClick={turnIntoNonPeriod}>
            Retornar a um acontecimento regular
          </PeriodMessage>
        </>
      )}
    </>
  )
}
EndDateDisplay.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  fieldId: PropTypes.string,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showMessageTrigger: PropTypes.bool,
  setShowMessageTrigger: PropTypes.func,
  enableSpeechToText: PropTypes.object,
  setEnableSpeechToText: PropTypes.func,
}

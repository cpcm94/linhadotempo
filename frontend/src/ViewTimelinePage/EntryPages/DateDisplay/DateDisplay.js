import React, { useState } from 'react'
import { DaySelector } from './DaySelector/DaySelector'
import { MonthSelector } from './MonthSelector/MonthSelector'
import { YearField } from './YearField/YearField'
import PropTypes from 'prop-types'
import {
  ConfirmDateButton,
  ConfirmeDateWrapper,
  DateResult,
  DateSpan,
  DateWrapper,
  EllipsisWrapper,
  InnerDateWrapper,
  MicButtonAndTranscriptWrapper,
  SpeechToTextWrapper,
  TranscriptText,
  XIconWrapper,
} from './DateDisplay.styles'
import { monthNameArray } from '../../../_shared/monthNameArray'
import { ResetFieldButton } from './ResetFieldButton'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'
import { EndDateDisplay } from './EndDateDisplay'
import { MicButton } from '../../../_shared/MicButton'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { XIcon } from '../../../_shared/XIcon'

export const DateDisplay = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
  fieldId,
  entryError,
}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  const listenContinuously = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'pt-br' })
  }

  const [showEndDateDisplay, setShowEndDateDisplay] = useState(false)
  const [showDayPicker, setShowDayPicker] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)

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

  const confirmDateFromTranscript = (dateObject) => {
    const newEntry = { ...entry }
    newEntry.day = parseInt(dateObject.day)
    newEntry.month = dateObject.month
    newEntry.year = dateObject.year
    setEntry(newEntry)
    SpeechRecognition.stopListening()
  }
  const checkIfEmptyString = (string) => string.toString().trim() === ''

  const showErrorMessage = entryError && entryError.field === 'date'

  const showEllipsisButton = !showEndDateDisplay && entry.year !== ''

  const textToDate = (text) => {
    const arrayOfSplitText = text.split(' ')
    const arrayOfMonths = monthNameArray.map((month) => month.toLowerCase())
    const getMonthNumber = (monthName) =>
      arrayOfMonths.indexOf(monthName.toLowerCase())

    const countOccurencesOfItem = (array, item) =>
      array.reduce((n, value) => {
        return n + (value === item)
      }, 0)

    if (countOccurencesOfItem(arrayOfSplitText, 'de') === 2) {
      return {
        year: arrayOfSplitText[4],
        month: getMonthNumber(arrayOfSplitText[2]),
        day: arrayOfSplitText[0],
      }
    } else if (countOccurencesOfItem(arrayOfSplitText, 'de') === 1) {
      return {
        year: arrayOfSplitText[2],
        month: getMonthNumber(arrayOfSplitText[0]),
        day: null,
      }
    } else if (countOccurencesOfItem(arrayOfSplitText, 'de') === 0) {
      return { year: arrayOfSplitText[0], month: null, day: null }
    }
  }

  const convertDateObjectToString = (dateObject) => {
    if (dateObject)
      if (dateObject.day) {
        return `${dateObject.day}/${monthNameArray[dateObject.month]}/${
          dateObject.year
        }`
      } else if (dateObject.month && !dateObject.day) {
        return `dia/${monthNameArray[dateObject.month]}/${dateObject.year}`
      } else if (!dateObject.month && !dateObject.day) {
        return `dia/mês/${dateObject.year}`
      }
  }

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
          <SpeechToTextWrapper>
            <MicButtonAndTranscriptWrapper>
              <MicButton
                color={listening && 'red'}
                onClick={
                  listening
                    ? SpeechRecognition.stopListening
                    : listenContinuously
                }
              />
              <TranscriptText>{transcript}</TranscriptText>
            </MicButtonAndTranscriptWrapper>
            {transcript.length > 0 && (
              <ConfirmeDateWrapper>
                <ConfirmDateButton
                  onClick={() =>
                    confirmDateFromTranscript(textToDate(transcript))
                  }
                >
                  &#10003;
                </ConfirmDateButton>
                <DateResult>
                  {convertDateObjectToString(textToDate(transcript))}
                </DateResult>
                <XIconWrapper>
                  <XIcon onClick={resetTranscript} />
                </XIconWrapper>
              </ConfirmeDateWrapper>
            )}
          </SpeechToTextWrapper>
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

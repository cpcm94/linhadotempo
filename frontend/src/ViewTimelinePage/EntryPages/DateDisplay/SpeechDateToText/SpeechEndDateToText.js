import React, { useCallback, useEffect, useRef } from 'react'
import { MicButton } from '../../../../_shared/MicButton'
import {
  MicButtonAndTranscriptWrapper,
  SpeechToTextWrapper,
  TranscriptText,
  TranscriptTextWrapper,
} from './SpeechDateToText.styles'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import PropTypes from 'prop-types'
import { textToDate } from './textToDate'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 2500
let timeoutId = null

export const SpeechEndDateToText = ({
  entry,
  setEntry,
  enableSpeechToText,
  setEnableSpeechToText,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()
  const isFirstRun = useRef(true)

  const listenContinuously = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'pt-br' })
  }

  const handleMicClick = () => {
    setEnableSpeechToText({
      dateDisplayMic: false,
      endDateDisplayMic: true,
    })
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      listenContinuously()
    }
    resetTranscript()
  }
  console.log('entry', entry)
  const confirmDateFromTranscript = useCallback(
    (dateObject) => {
      console.log('dateObject', dateObject)
      const newEntry = { ...entry }
      newEntry.end_day = dateObject.day ? parseInt(dateObject.day) : ''
      newEntry.end_month = dateObject.month ? dateObject.month : ''
      newEntry.end_year = dateObject.year ? dateObject.year : ''
      setEntry(newEntry)
      SpeechRecognition.stopListening()
      setEnableSpeechToText({
        dateDisplayMic: false,
        endDateDisplayMic: false,
      })
      resetTranscript()
    },
    [entry, resetTranscript, setEnableSpeechToText, setEntry]
  )

  const enabled = enableSpeechToText.endDateDisplayMic
  const listeningAndEnabled = listening && enabled

  useEffect(() => {
    if (enabled) {
      const hasMonthOrEmptyMonth =
        textToDate(transcript).month || textToDate(transcript).month === ''
      const hasDayOrEmptyDay =
        textToDate(transcript).day || textToDate(transcript).day === ''

      const textToDateIsValid =
        textToDate(transcript).year &&
        textToDate(transcript).year !== '' &&
        hasMonthOrEmptyMonth &&
        hasDayOrEmptyDay

      if (!isFirstRun.current) {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        if (textToDateIsValid)
          timeoutId = setTimeout(() => {
            confirmDateFromTranscript(textToDate(transcript))
          }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
      } else {
        isFirstRun.current = false
      }
    }
  }, [confirmDateFromTranscript, enabled, transcript])

  return (
    <>
      {browserSupportsSpeechRecognition && (
        <SpeechToTextWrapper>
          <MicButtonAndTranscriptWrapper>
            <MicButton
              color={listeningAndEnabled && 'red'}
              onClick={handleMicClick}
            />
          </MicButtonAndTranscriptWrapper>
          <TranscriptTextWrapper>
            <TranscriptText>{enabled ? transcript : null}</TranscriptText>
          </TranscriptTextWrapper>
        </SpeechToTextWrapper>
      )}
    </>
  )
}

SpeechEndDateToText.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  enableSpeechToText: PropTypes.object,
  setEnableSpeechToText: PropTypes.func,
}

import React from 'react'
import { MicButton } from '../../../../_shared/MicButton'
import { XIcon } from '../../../../_shared/XIcon'
import {
  ConfirmDateButton,
  ConfirmeDateWrapper,
  DateResult,
  MicButtonAndTranscriptWrapper,
  SpeechToTextWrapper,
  TranscriptText,
  XIconWrapper,
} from './SpeechDateToText.styles'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import PropTypes from 'prop-types'
import { textToDate } from './textToDate'
import { convertDateObjectToString } from './convertDateObjectToString'

export const SpeechEndDateToText = ({
  entry,
  setEntry,
  enableSpeechToText,
  setEnableSpeechToText,
}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

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

  const confirmDateFromTranscript = (dateObject) => {
    const newEntry = { ...entry }
    newEntry.end_day = dateObject.day ? parseInt(dateObject.day) : ''
    newEntry.end_month = dateObject.month ? dateObject.month : ''
    newEntry.end_year = dateObject.year ? dateObject.year : ''
    setEntry(newEntry)
    SpeechRecognition.stopListening()
    resetTranscript()
  }

  const enabled = enableSpeechToText.endDateDisplayMic
  const listeningAndEnabled = listening && enabled
  return (
    <SpeechToTextWrapper>
      <MicButtonAndTranscriptWrapper>
        <MicButton
          color={listeningAndEnabled && 'red'}
          onClick={handleMicClick}
        />
        <TranscriptText>{enabled ? transcript : null}</TranscriptText>
      </MicButtonAndTranscriptWrapper>
      {transcript.length > 0 && enabled ? (
        <ConfirmeDateWrapper>
          <ConfirmDateButton
            onClick={() => confirmDateFromTranscript(textToDate(transcript))}
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
      ) : null}
    </SpeechToTextWrapper>
  )
}

SpeechEndDateToText.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  enableSpeechToText: PropTypes.object,
  setEnableSpeechToText: PropTypes.func,
}

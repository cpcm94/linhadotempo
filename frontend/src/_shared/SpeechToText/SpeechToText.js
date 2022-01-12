import React, { useState } from 'react'
import {
  MicButtonAndTranscriptWrapper,
  SpeechToNameWrapper,
} from './SpeechToText.styles'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import PropTypes from 'prop-types'
import { MicButton } from '../MicButton'

export const SpeechToText = ({ onTextChange }) => {
  const [recording, setRecording] = useState(false)
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ transcribing: recording })

  const handleMicClick = () => {
    if (!recording) {
      setRecording(true)
      SpeechRecognition.startListening({ language: 'pt-br', continuous: true })
    } else {
      setRecording(false)
      SpeechRecognition.stopListening()
      onTextChange(transcript)
      resetTranscript()
    }
  }

  const micColor = recording ? 'red' : 'black'

  return (
    <>
      {browserSupportsSpeechRecognition && (
        <SpeechToNameWrapper>
          <MicButtonAndTranscriptWrapper>
            <MicButton color={micColor} onClick={handleMicClick} />
          </MicButtonAndTranscriptWrapper>
        </SpeechToNameWrapper>
      )}
    </>
  )
}

SpeechToText.propTypes = {
  onTextChange: PropTypes.func,
}

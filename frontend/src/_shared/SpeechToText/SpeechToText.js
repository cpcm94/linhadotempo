import React, { useEffect, useState } from 'react'
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
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ transcribing: recording })

  const handleMicClick = () => {
    setRecording(true)
    SpeechRecognition.startListening({ language: 'pt-br' })
  }
  useEffect(() => {
    if (!listening) {
      setRecording(false)
      if (transcript) {
        onTextChange(transcript)
        resetTranscript()
      }
    }
  }, [listening, onTextChange, resetTranscript, transcript])

  return (
    <>
      {browserSupportsSpeechRecognition && (
        <SpeechToNameWrapper>
          <MicButtonAndTranscriptWrapper>
            <MicButton color={recording && 'red'} onClick={handleMicClick} />
          </MicButtonAndTranscriptWrapper>
        </SpeechToNameWrapper>
      )}
    </>
  )
}

SpeechToText.propTypes = {
  onTextChange: PropTypes.func,
}

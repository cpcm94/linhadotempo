import React, { useEffect, useState } from 'react'
import {
  MicButtonAndTranscriptWrapper,
  SpeechToNameWrapper,
} from './SpeechToName.styles'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import PropTypes from 'prop-types'
import { MicButton } from '../../../../_shared/MicButton'

export const SpeechToName = ({ changeName, entryName }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()
  const [enabled, setEnabled] = useState(false)

  const listenContinuously = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'pt-br' })
  }

  const handleMicClick = () => {
    setEnabled(true)
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      listenContinuously()
    }
    resetTranscript()
  }

  const listeningAndEnabled = listening && enabled

  useEffect(() => {
    if (enabled) {
      if (transcript.length > 0 && transcript !== entryName)
        changeName(transcript)
    }
  }, [changeName, enabled, entryName, transcript])
  return (
    <>
      {browserSupportsSpeechRecognition && (
        <SpeechToNameWrapper>
          <MicButtonAndTranscriptWrapper>
            <MicButton
              color={listeningAndEnabled && 'red'}
              onClick={handleMicClick}
            />
          </MicButtonAndTranscriptWrapper>
        </SpeechToNameWrapper>
      )}
    </>
  )
}

SpeechToName.propTypes = {
  changeName: PropTypes.func,
  entryName: PropTypes.string,
}

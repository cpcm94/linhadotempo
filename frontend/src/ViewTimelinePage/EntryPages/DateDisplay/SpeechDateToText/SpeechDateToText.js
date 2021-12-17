import React from 'react'
// import { MicButton } from '../../../../_shared/MicButton'
// import {
//   MicButtonAndTranscriptWrapper,
//   SpeechToTextWrapper,
//   TranscriptText,
//   TranscriptTextWrapper,
// } from './SpeechDateToText.styles'
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from 'react-speech-recognition'
// import { textToDate } from './textToDate'
import PropTypes from 'prop-types'
import { SpeechToText } from '../../../../_shared/SpeechToText/SpeechToText'

// const AUTO_SAVE_DEBOUNCE_MILISECONDS = 2500
// let timeoutId = null

export const SpeechDateToText = ({ onDateChange }) => {
  const transformTextToDate = (text) => {
    console.log({ text })
    onDateChange({ year: '2020', month: 9, day: '2' })
  }
  return <SpeechToText onTextChange={transformTextToDate} />
}

SpeechDateToText.propTypes = {
  onDateChange: PropTypes.func,
}

// const {
//   transcript,
//   listening,
//   resetTranscript,
//   browserSupportsSpeechRecognition,
// } = useSpeechRecognition()
// const isFirstRun = useRef(true)

// const listenContinuously = () => {
//   SpeechRecognition.startListening({ continuous: true, language: 'pt-br' })
// }

// const handleMicClick = () => {
//   setEnableSpeechToText({
//     dateDisplayMic: true,
//     endDateDisplayMic: false,
//   })
//   if (listening) {
//     SpeechRecognition.stopListening()
//   } else {
//     listenContinuously()
//   }
//   resetTranscript()
// }

// const confirmDateFromTranscript = useCallback(
//   (dateObject) => {
//     const newEntry = { ...entry }
//     newEntry.day = dateObject.day ? parseInt(dateObject.day) : ''
//     newEntry.month = dateObject.month ? dateObject.month : ''
//     newEntry.year = dateObject.year
//     setEntry(newEntry)
//     SpeechRecognition.stopListening()
//     setEnableSpeechToText({
//       dateDisplayMic: false,
//       endDateDisplayMic: false,
//     })
//     resetTranscript()
//   },
//   [entry, resetTranscript, setEnableSpeechToText, setEntry]
// )

// const enabled = enableSpeechToText.dateDisplayMic
// const listeningAndEnabled = listening && enabled

// useEffect(() => {
//   if (enabled) {
//     const hasMonthOrEmptyMonth =
//       textToDate(transcript).month || textToDate(transcript).month === ''
//     const hasDayOrEmptyDay =
//       textToDate(transcript).day || textToDate(transcript).day === ''

//     const textToDateIsValid =
//       textToDate(transcript).year &&
//       textToDate(transcript).year !== '' &&
//       hasMonthOrEmptyMonth &&
//       hasDayOrEmptyDay

//     if (!isFirstRun.current) {
//       if (timeoutId) {
//         clearTimeout(timeoutId)
//       }
//       if (textToDateIsValid)
//         timeoutId = setTimeout(() => {
//           confirmDateFromTranscript(textToDate(transcript))
//         }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
//     } else {
//       isFirstRun.current = false
//     }
//   }
// }, [confirmDateFromTranscript, enabled, transcript])

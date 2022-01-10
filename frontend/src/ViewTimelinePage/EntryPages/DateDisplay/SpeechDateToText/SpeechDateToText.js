import React from 'react'
import { textToDate } from './textToDate'
import PropTypes from 'prop-types'
import { SpeechToText } from '../../../../_shared/SpeechToText/SpeechToText'

export const SpeechDateToText = ({ onDateChange }) => {
  const transformTextToDate = (text) => {
    const dateObject = textToDate(text)
    const hasMonthOrEmptyMonth = dateObject.month || dateObject.month === ''
    const hasDayOrEmptyDay = dateObject.day || dateObject.day === ''

    const dateIsValid =
      dateObject.year &&
      dateObject.year !== '' &&
      hasMonthOrEmptyMonth &&
      hasDayOrEmptyDay

    if (dateIsValid) {
      onDateChange(dateObject)
    }
  }
  return <SpeechToText onTextChange={transformTextToDate} />
}

SpeechDateToText.propTypes = {
  onDateChange: PropTypes.func,
}

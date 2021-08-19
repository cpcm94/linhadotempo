import React from 'react'
import { StyledButton } from './SubmitFormButton.styles'
import PropTypes from 'prop-types'

export const SubmitFormButton = ({ onClick, buttonText, entry }) => {
  const aboveMaxNameLength = entry.name.length > 255
  const emptyName = entry.name.trim() === ''
  const dayWithoutYearOrMonth =
    entry.day !== '' && (entry.month === '' || entry.year === '')
  const monthWithoutYear = entry.month !== '' && entry.year === ''

  const disableSubmitButton =
    aboveMaxNameLength || dayWithoutYearOrMonth || monthWithoutYear || emptyName
  return (
    <StyledButton
      onClick={onClick}
      disabled={disableSubmitButton}
      variant="contained"
    >
      {buttonText}
    </StyledButton>
  )
}

SubmitFormButton.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  entry: PropTypes.object,
}

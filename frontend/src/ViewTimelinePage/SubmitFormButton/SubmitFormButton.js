import React from 'react'
import { StyledButton, Wrapper, ErrorText } from './SubmitFormButton.styles'
import PropTypes from 'prop-types'

export const SubmitFormButton = ({ onClick, buttonText, entry }) => {
  const aboveMaxNameLength = entry.name.length > 300
  const emptyName = entry.name.trim() === ''
  const dayWithoutYearOrMonth =
    entry.day !== '' && (entry.month === '' || entry.year === '')
  const monthWithoutYear = entry.month !== '' && entry.year === ''

  const disableSubmitButton =
    aboveMaxNameLength || dayWithoutYearOrMonth || monthWithoutYear || emptyName

  const errorMessage = () => {
    if (aboveMaxNameLength) {
      return 'Nome do acontecimento está com tamanho acima do limite!'
    } else if (dayWithoutYearOrMonth) {
      return 'Não é possível criar acontecimento com dia sem possuir mês e ano'
    } else if (monthWithoutYear) {
      return 'Não é possível criar acontecimento com mês sem possuir ano'
    } else if (emptyName) {
      return 'Não é possível criar acontecimento sem nome'
    }
  }
  return (
    <Wrapper>
      <ErrorText>{disableSubmitButton ? errorMessage() : ''}</ErrorText>
      <StyledButton
        onClick={onClick}
        disabled={disableSubmitButton}
        variant="contained"
      >
        {buttonText}
      </StyledButton>
    </Wrapper>
  )
}

SubmitFormButton.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  entry: PropTypes.object,
}

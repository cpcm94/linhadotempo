import React from 'react'
import { StyledButton, Wrapper } from './SubmitFormButton.styles'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'

export const SubmitFormButton = ({ onClick, buttonText, entry }) => {
  const aboveMaxNameLength = entry.name.length > 300
  const emptyName = entry.name.trim() === ''
  const dayWithoutYearOrMonth =
    entry.day !== '' && (entry.month === '' || entry.year === '')
  const monthWithoutYear = entry.month !== '' && entry.year === ''
  const entryWithoutTimeline = !entry.timelines.sync[0]

  const disableSubmitButton =
    aboveMaxNameLength ||
    dayWithoutYearOrMonth ||
    monthWithoutYear ||
    emptyName ||
    entryWithoutTimeline

  const errorMessage = () => {
    if (aboveMaxNameLength) {
      return 'Nome do acontecimento está com tamanho acima do limite!'
    } else if (dayWithoutYearOrMonth) {
      return 'Não é possível criar acontecimento com dia sem possuir mês e ano'
    } else if (monthWithoutYear) {
      return 'Não é possível criar acontecimento com mês sem possuir ano'
    } else if (emptyName) {
      return 'Não é possível criar acontecimento sem nome'
    } else if (entryWithoutTimeline) {
      return 'Não é possível criar acontecimento sem linha do tempo'
    }
  }
  return (
    <Wrapper>
      <ErrorMessage>{disableSubmitButton ? errorMessage() : ''}</ErrorMessage>
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

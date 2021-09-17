import React from 'react'
import { StyledButton, ButtonWrapper, ErrorText } from './NewBookForm.styles'
import PropTypes from 'prop-types'

export const SubmitFormButton = ({ onClick, buttonText, book, loading }) => {
  const aboveMaxNameLength = book.book_name.length > 255
  const emptyName = book.book_name.trim() === ''

  const disableSubmitButton = aboveMaxNameLength || emptyName || loading

  const errorMessage = () => {
    if (aboveMaxNameLength) {
      return 'Nome do livro está com tamanho acima do limite!'
    } else if (emptyName) {
      return 'Não é possível criar livro sem nome'
    }
  }
  return (
    <ButtonWrapper>
      <ErrorText>{disableSubmitButton ? errorMessage() : ''}</ErrorText>
      <StyledButton
        onClick={onClick}
        disabled={disableSubmitButton}
        variant="contained"
      >
        {loading ? 'Loading' : buttonText}
      </StyledButton>
    </ButtonWrapper>
  )
}

SubmitFormButton.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  book: PropTypes.object,
  loading: PropTypes.bool,
}
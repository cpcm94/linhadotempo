import React from 'react'
import { DeleteButton } from '../../_shared/DeleteButton'
import {
  DeleteButtonWrapper,
  StyledTextField,
  Wrapper,
} from './NewBookForm.styles'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../../_shared/ErrorMessage.styles'

export const NewBookForm = ({
  book,
  setBook,
  bookId,
  deleteLoading,
  handleDelete,
  bookError,
}) => {
  const handleChange = (bookPropName) => (e) => {
    const newBook = { ...book }
    newBook[bookPropName] = e.target.value
    setBook(newBook)
  }
  const showNameFieldError = bookError && bookError.field === 'name'

  return (
    <Wrapper>
      {showNameFieldError && (
        <ErrorMessage>Nome do livro não pode estar em branco.</ErrorMessage>
      )}
      <StyledTextField
        type="text"
        variant="outlined"
        label="Nome"
        value={book.book_name}
        onChange={handleChange('book_name')}
      />
      <StyledTextField
        type="text"
        variant="outlined"
        label="Autor"
        value={book.author}
        onChange={handleChange('author')}
      />
      <StyledTextField
        type="text"
        variant="outlined"
        label="Editora"
        value={book.publisher}
        onChange={handleChange('publisher')}
      />
      <StyledTextField
        type="text"
        variant="outlined"
        label="Edição"
        value={book.edition}
        onChange={handleChange('edition')}
      />
      <StyledTextField
        id="date"
        label="Ano de publicação"
        type="number"
        variant="outlined"
        value={book.publishing_year}
        onChange={handleChange('publishing_year')}
      />
      <DeleteButtonWrapper showBorder={bookId}>
        {bookId &&
          (deleteLoading ? (
            <span>Loading...</span>
          ) : (
            <DeleteButton onClick={handleDelete} />
          ))}
      </DeleteButtonWrapper>
    </Wrapper>
  )
}

NewBookForm.propTypes = {
  book: PropTypes.object,
  setBook: PropTypes.func,
  bookId: PropTypes.any,
  deleteLoading: PropTypes.bool,
  handleDelete: PropTypes.func,
  bookError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

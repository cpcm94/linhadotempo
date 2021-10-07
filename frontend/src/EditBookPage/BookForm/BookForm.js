import React from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, Wrapper } from './BookForm.styles'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { ErrorMessage } from '../../_shared/ErrorMessage.styles'

export const BookForm = ({
  book,
  setBook,
  handleDelete,
  deleteLoading,
  bookEntries,
  bookError,
}) => {
  const handleChange = (bookPropName) => (e) => {
    const newBook = { ...book }
    newBook[bookPropName] = e.target.value
    setBook(newBook)
  }

  const numberOfRelatedEntries = bookEntries.length
  const skipDeleteMessage = !numberOfRelatedEntries
  const deleteMessage = `Ao deletar esse livro ${
    numberOfRelatedEntries > 1
      ? `${numberOfRelatedEntries} acontecimentos perderão esse livro como fonte`
      : `1 acontecimento irá perder esse livro como fonte`
  }. Tem certeza que deseja deletar esse livro? Essa ação será irreversível.`

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
        type="number"
        label="Ano de publicação"
        variant="outlined"
        value={book.publishing_year}
        onChange={handleChange('publishing_year')}
        isLast={true}
      />
      <DeleteButtonAndConfirmation
        deleteMessage={deleteMessage}
        skipDeleteMessage={skipDeleteMessage}
        loading={deleteLoading}
        deleteFunction={handleDelete}
      />
    </Wrapper>
  )
}

BookForm.propTypes = {
  book: PropTypes.object,
  setBook: PropTypes.func,
  handleDelete: PropTypes.func,
  deleteLoading: PropTypes.bool,
  bookEntries: PropTypes.array,
  bookError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

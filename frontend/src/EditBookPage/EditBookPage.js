import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, Wrapper } from './EditBookPage.styles'
// import { useMutation } from '@apollo/client'
// import { UPDATE_BOOK_MUTATION } from './UPDATE_BOOK_MUTATION'

export const EditBookPage = ({ bookData }) => {
  const [book, setBook] = useState({
    book_name: bookData.book_name,
    publisher: bookData.publisher,
    publishing_date: bookData.publishing_date,
    edition: bookData.edition,
    author: bookData.author,
  })
  //   const [updateBook, {loading}] = useMutation(UPDATE_BOOK_MUTATION, {
  //       variables: {
  //           id: bookData.id,
  //           input: book,
  //       }

  // })
  const handleChange = (bookPropName) => (e) => {
    const newBook = { ...book }
    newBook[bookPropName] = e.target.value
    setBook(newBook)
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

EditBookPage.propTypes = {
  bookData: PropTypes.object,
}

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, Wrapper } from './BookForm.styles'
import { useMutation } from '@apollo/client'
import { UPDATE_BOOK_MUTATION } from './UPDATE_BOOK_MUTATION'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const BookForm = ({ bookData, setLoading }) => {
  const isFirstRun = useRef(true)
  const [book, setBook] = useState({
    book_name: bookData.book_name,
    publisher: bookData.publisher,
    publishing_date: bookData.publishing_date,
    edition: bookData.edition,
    author: bookData.author,
  })
  const [updateBook, { loading }] = useMutation(UPDATE_BOOK_MUTATION, {
    variables: {
      id: bookData.id,
      input: book,
    },
  })
  const handleChange = (bookPropName) => (e) => {
    const newBook = { ...book }
    newBook[bookPropName] = e.target.value
    setBook(newBook)
  }
  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  useEffect(() => {
    if (!isFirstRun.current && book.publishing_date !== '') {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: bookData.id,
            input: book,
          },
        }
        updateBook(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [bookData.id, book, updateBook])

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
      <StyledTextField
        id="date"
        label="Data de publicação"
        type="date"
        variant="outlined"
        value={book.publishing_date}
        onChange={handleChange('publishing_date')}
      />
    </Wrapper>
  )
}

BookForm.propTypes = {
  bookData: PropTypes.object,
  setLoading: PropTypes.func,
}

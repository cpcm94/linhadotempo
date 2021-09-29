import React from 'react'
import PropTypes from 'prop-types'
import {
  BookNameWrapper,
  BooksListWrapper,
  BooksWrapper,
  NameWrapper,
} from './BooksList.styles'
import { useHistory } from 'react-router'

export const BooksList = ({ books }) => {
  let history = useHistory()
  const navigateToEditBookPage = (bookId) => (e) => {
    e.preventDefault()
    history.push(`/editBook/${bookId}`)
  }
  return (
    <BooksListWrapper>
      {books.map((book) => (
        <BooksWrapper key={book.id} onClick={navigateToEditBookPage(book.id)}>
          <NameWrapper>
            <BookNameWrapper>{book.book_name}</BookNameWrapper>
          </NameWrapper>
        </BooksWrapper>
      ))}
    </BooksListWrapper>
  )
}

BooksList.propTypes = {
  books: PropTypes.array,
}

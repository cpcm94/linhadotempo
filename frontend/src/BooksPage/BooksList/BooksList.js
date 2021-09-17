import React from 'react'
import PropTypes from 'prop-types'
import { EditButton } from '../../_shared/EditButton'
import {
  BookNameWrapper,
  BooksListWrapper,
  BooksWrapper,
  EditButtonWrapper,
  NameWrapper,
} from './BooksList.styles'
import { useHistory } from 'react-router'

export const BooksList = ({ books }) => {
  let history = useHistory()
  const navigateToEditUserPage = (bookId) => (e) => {
    e.preventDefault()
    history.push(`/editBook/${bookId}`)
  }
  return (
    <BooksListWrapper>
      {books.map((book) => (
        <BooksWrapper key={book.id}>
          <NameWrapper>
            <BookNameWrapper>{book.book_name}</BookNameWrapper>
          </NameWrapper>
          <EditButtonWrapper onClick={navigateToEditUserPage(book.id)}>
            <EditButton />
          </EditButtonWrapper>
        </BooksWrapper>
      ))}
    </BooksListWrapper>
  )
}

BooksList.propTypes = {
  books: PropTypes.array,
}

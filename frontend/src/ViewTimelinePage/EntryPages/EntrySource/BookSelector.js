import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import {
  StyledSelectTextField,
  BookSelectorWrapper,
  BookPageWrapper,
  StyledTextField,
} from './EntrySource.styles'
import { MinusIcon } from '../../../_shared/MinusIcon'
import { PlusIcon } from '../../../_shared/PlusIcon'

export const BookSelector = ({
  books,
  entry,
  changeEntry,
  showBookSelector,
  setBookPage,
}) => {
  const incrementByNumber = (book_page, number) => {
    if (book_page === '') {
      return setBookPage(number.toString())
    }
    const newBookPage = parseInt(book_page) + number
    const stringBookPage = newBookPage.toString()
    setBookPage(stringBookPage)
  }
  const decreaseByNumber = (book_page, number) => {
    if (parseInt(book_page) === 0) return
    if (book_page === '') {
      return setBookPage('0')
    }
    const newBookPage = parseInt(book_page) - number
    const nonNegativeBookPage = newBookPage < 0 ? 0 : newBookPage
    const stringBookPage = nonNegativeBookPage.toString()
    setBookPage(stringBookPage)
  }

  return (
    <>
      {showBookSelector && (
        <BookSelectorWrapper>
          <StyledSelectTextField
            select
            label="Livro"
            value={entry.book_id}
            onChange={changeEntry('book_id')}
            variant="outlined"
          >
            <MenuItem key={''} value={''}>
              {''}
            </MenuItem>
            {books.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {`${book.book_name}${book.author && `, ${book.author}`}${
                  book.publisher && `, ${book.publisher}`
                }`}
              </MenuItem>
            ))}
          </StyledSelectTextField>
          <BookPageWrapper>
            <MinusIcon
              size={'30'}
              onClick={() => decreaseByNumber(entry.book_page, 100)}
            />
            <MinusIcon
              size={'25'}
              onClick={() => decreaseByNumber(entry.book_page, 10)}
            />
            <MinusIcon
              size={'20'}
              onClick={() => decreaseByNumber(entry.book_page, 1)}
            />
            <StyledTextField
              type="number"
              label="Pág"
              value={entry.book_page}
              onChange={changeEntry('book_page')}
              variant="outlined"
            />
            <PlusIcon
              size={'20'}
              onClick={() => incrementByNumber(entry.book_page, 1)}
            />
            <PlusIcon
              size={'25'}
              onClick={() => incrementByNumber(entry.book_page, 10)}
            />
            <PlusIcon
              size={'30'}
              onClick={() => incrementByNumber(entry.book_page, 100)}
            />
          </BookPageWrapper>
        </BookSelectorWrapper>
      )}
    </>
  )
}

BookSelector.propTypes = {
  books: PropTypes.array,
  entry: PropTypes.object,
  changeEntry: PropTypes.func,
  showBookSelector: PropTypes.bool,
  setBookPage: PropTypes.func,
}

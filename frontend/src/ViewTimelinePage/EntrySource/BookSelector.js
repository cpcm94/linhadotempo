import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import {
  StyledSelectTextField,
  BookSelectorWrapper,
} from './EntrySource.styles'

export const BookSelector = ({
  books,
  entry,
  changeEntry,
  showBookSelector,
}) => {
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
            {books.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.book_name}
              </MenuItem>
            ))}
          </StyledSelectTextField>
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
}

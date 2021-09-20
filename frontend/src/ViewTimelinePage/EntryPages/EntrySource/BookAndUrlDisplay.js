import React from 'react'
import PropTypes from 'prop-types'
import { SourceTextInfo } from './EntrySource.styles'

export const BookAndUrlDisplay = ({
  entry,
  chosenBook,
  showBookDisplay,
  showSiteDisplay,
}) => {
  const book = chosenBook
    ? chosenBook
    : { book_name: '', author: '', publisher: '' }
  const noTabsOpen = !showBookDisplay && !showSiteDisplay
  const showPageNumber = book.book_name !== '' && entry.book_page !== ''
  return (
    <>
      {noTabsOpen && (
        <>
          {book.book_name !== '' && (
            <SourceTextInfo>Nome do Livro: {book.book_name}</SourceTextInfo>
          )}
          {showPageNumber && (
            <SourceTextInfo>Página: {entry.book_page}</SourceTextInfo>
          )}
          {book.author !== '' && (
            <SourceTextInfo>Autor: {book.author}</SourceTextInfo>
          )}
          {book.publisher !== '' && (
            <SourceTextInfo>Editora: {book.publisher}</SourceTextInfo>
          )}
          {entry.source_url !== '' && (
            <SourceTextInfo>Url: {entry.source_url}</SourceTextInfo>
          )}
        </>
      )}
    </>
  )
}

BookAndUrlDisplay.propTypes = {
  entry: PropTypes.object,
  chosenBook: PropTypes.object,
  showBookDisplay: PropTypes.bool,
  showSiteDisplay: PropTypes.bool,
}

import React from 'react'
import PropTypes from 'prop-types'
import { SourceTextInfo } from './EntrySource.styles'

export const BookAndUrlDisplay = ({
  entry,
  chosenBook,
  showBookDisplay,
  showSiteDisplay,
}) => {
  const noTabsOpen = !showBookDisplay && !showSiteDisplay
  const showPageNumber = chosenBook.book_name !== '' && entry.book_page !== ''
  return (
    <>
      {noTabsOpen && (
        <>
          {chosenBook.book_name !== '' && (
            <SourceTextInfo>
              Nome do Livro: {chosenBook.book_name}
            </SourceTextInfo>
          )}
          {showPageNumber && (
            <SourceTextInfo>Página: {entry.book_page}</SourceTextInfo>
          )}
          {chosenBook.author !== '' && (
            <SourceTextInfo>Autor: {chosenBook.author}</SourceTextInfo>
          )}
          {chosenBook.publisher !== '' && (
            <SourceTextInfo>Editora: {chosenBook.publisher}</SourceTextInfo>
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

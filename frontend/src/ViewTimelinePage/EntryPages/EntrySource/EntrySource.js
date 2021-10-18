import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { SourceTabs, TabSpan, InnerWrapper } from './EntrySource.styles'
import { SourceUrlDisplay } from './SourceUrlDisplay'
import { BookSelector } from './BookSelector'
import { BookAndUrlDisplay } from './BookAndUrlDisplay'

export const EntrySource = ({ entry, books, changeEntry, setEntry }) => {
  const [showBookDisplay, setShowBookDisplay] = useState(false)
  const [showSiteDisplay, setShowSiteDisplay] = useState(false)

  const resetSources = () => {
    const newEntry = { ...entry }
    newEntry.source_url = ''
    newEntry.book_id = ''
    setEntry(newEntry)
  }

  const toggleBookDisplay = () => {
    setShowBookDisplay(!showBookDisplay)
    if (showSiteDisplay) setShowSiteDisplay(false)
  }
  const toggleSiteDisplay = () => {
    setShowSiteDisplay(!showSiteDisplay)
    if (showBookDisplay) setShowBookDisplay(false)
  }

  const setBookPage = (book_page) => {
    const newEntry = { ...entry }
    newEntry.book_page = book_page
    setEntry(newEntry)
  }

  const chosenBook = books.filter((book) => entry.book_id === book.id)[0]
  return (
    <>
      <SectionTitle title={'Fonte'} resetSection={resetSources} />
      <InnerWrapper>
        <SourceTabs>
          <TabSpan selected={showBookDisplay} onClick={toggleBookDisplay}>
            {'Livro'}
          </TabSpan>
          <span> | </span>
          <TabSpan selected={showSiteDisplay} onClick={toggleSiteDisplay}>
            {'Site'}
          </TabSpan>
        </SourceTabs>
        <BookAndUrlDisplay
          entry={entry}
          chosenBook={chosenBook}
          showSiteDisplay={showSiteDisplay}
          showBookDisplay={showBookDisplay}
        />
        <SourceUrlDisplay
          entry={entry}
          changeEntry={changeEntry}
          showSiteDisplay={showSiteDisplay}
        />
        <BookSelector
          books={books}
          entry={entry}
          setBookPage={setBookPage}
          changeEntry={changeEntry}
          showBookSelector={showBookDisplay}
        />
      </InnerWrapper>
    </>
  )
}

EntrySource.propTypes = {
  entry: PropTypes.object,
  changeEntry: PropTypes.func,
  books: PropTypes.array,
  setEntry: PropTypes.func,
}

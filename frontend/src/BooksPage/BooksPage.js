import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { BooksList } from './BooksList/BooksList'
import { useHistory } from 'react-router'
import { AddBookButton } from './AddBookButton/AddBookButton'

export const BooksPage = ({ books }) => {
  let history = useHistory()
  const navigateToNewBookPage = () => {
    history.push('/newBook')
  }
  return (
    <Layout>
      <Header
        title={'Livros'}
        pageActions={<AddBookButton onClick={navigateToNewBookPage} />}
        showMenuButton={true}
      />
      <Container>
        <BooksList books={books} />
      </Container>
    </Layout>
  )
}

BooksPage.propTypes = {
  books: PropTypes.array,
}

import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { BooksList } from './BooksList/BooksList'

export const BooksPage = ({ books }) => {
  return (
    <Layout>
      <Header title={'Livros'} showMenuButton={true} />
      <Container>
        <BooksList books={books} />
      </Container>
    </Layout>
  )
}

BooksPage.propTypes = {
  books: PropTypes.array,
}

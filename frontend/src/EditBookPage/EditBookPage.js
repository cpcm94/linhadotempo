import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { BookForm } from './BookForm/BookForm'

export const EditBookPage = ({ bookData }) => {
  return (
    <Layout>
      <Header title={'Editar Livro'} showMenuButton={true} />
      <Container>
        <BookForm bookData={bookData} />
      </Container>
    </Layout>
  )
}

EditBookPage.propTypes = {
  bookData: PropTypes.object,
}

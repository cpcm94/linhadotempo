import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { BookForm } from './BookForm/BookForm'

export const EditBookPage = ({ bookData }) => {
  const [loading, setLoading] = useState(false)
  return (
    <Layout>
      <Header title={'Editar Livro'} showMenuButton={true} loading={loading} />
      <Container>
        <BookForm bookData={bookData} setLoading={setLoading} />
      </Container>
    </Layout>
  )
}

EditBookPage.propTypes = {
  bookData: PropTypes.object,
}

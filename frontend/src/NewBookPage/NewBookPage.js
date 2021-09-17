import React from 'react'
import { useHistory } from 'react-router'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { NewBookForm } from './NewBookForm/NewBookForm'

export const NewBookPage = () => {
  let history = useHistory()
  const navigateToBooks = () => {
    history.push('/books')
  }
  return (
    <Layout>
      <Header title={'Novo Livro'} returnButton={navigateToBooks} />
      <Container>
        <NewBookForm />
      </Container>
    </Layout>
  )
}

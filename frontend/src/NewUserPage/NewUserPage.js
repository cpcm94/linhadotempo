import React from 'react'
import { NewUserForm } from './NewUserForm/NewUserForm'
import { Layout } from '../_shared/Layout'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { useHistory } from 'react-router'

export const NewUserPage = () => {
  let history = useHistory()
  const navigateToUsers = () => {
    history.push('/users')
  }
  return (
    <Layout>
      <Header title={'Novo Usuário'} returnButton={navigateToUsers} />
      <Container>
        <NewUserForm navigateToUsers={navigateToUsers} />
      </Container>
    </Layout>
  )
}

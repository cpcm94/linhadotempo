import React from 'react'
import { UsersList } from './UsersList/UsersList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { Container } from '../_shared/Container'

export const UsersPage = ({ users, refetch }) => {
  return (
    <Layout>
      <Header title={'Usuários'} showMenuButton={true} />
      <Container>
        <UsersList users={users} refetch={refetch} />
      </Container>
    </Layout>
  )
}

UsersPage.propTypes = {
  users: PropTypes.array,
  refetch: PropTypes.func,
}

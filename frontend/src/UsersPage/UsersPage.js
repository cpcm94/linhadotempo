import React from 'react'
import { UsersList } from './UsersList/UsersList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'

export const UsersPage = ({ users, refetch }) => {
  return (
    <Layout>
      <Header title={'Usuários'} showMenuButton={true} />
      <UsersList users={users} refetch={refetch} />
    </Layout>
  )
}

UsersPage.propTypes = {
  users: PropTypes.array,
  refetch: PropTypes.func,
}

import React from 'react'
import { UsersList } from './UsersList/UsersList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { Container } from '../_shared/Container'
import { AddUserButton } from './AddUserButton/AddUserButton'
import { useHistory } from 'react-router'

export const UsersPage = ({ users, refetch }) => {
  let history = useHistory()
  const navigateToNewUserPage = () => {
    history.push('/newUser')
  }
  return (
    <Layout>
      <Header
        title={'Usuários'}
        showMenuButton={true}
        pageActions={<AddUserButton onClick={navigateToNewUserPage} />}
      />
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

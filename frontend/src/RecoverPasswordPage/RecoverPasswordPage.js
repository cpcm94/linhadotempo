import React from 'react'
import { ChangePasswordForm } from '../_shared/ChangePasswordForm/ChangePasswordForm'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import PropTypes from 'prop-types'
import { UserInfoFields } from './UserInfoFields'

export const RecoverPasswordPage = ({ user }) => {
  return (
    <Layout>
      <Header title={'Recuperação de senha'} />
      <Container>
        <UserInfoFields user={user} />
        <ChangePasswordForm user={user} />
      </Container>
    </Layout>
  )
}

RecoverPasswordPage.propTypes = {
  user: PropTypes.object,
}

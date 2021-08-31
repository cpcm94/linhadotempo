import React from 'react'
import { ChangePasswordForm } from '../_shared/ChangePasswordForm/ChangePasswordForm'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import PropTypes from 'prop-types'

export const RecoverPasswordPage = ({ user }) => {
  return (
    <Layout>
      <Header />
      <Container>
        <ChangePasswordForm user={user} />
      </Container>
    </Layout>
  )
}

RecoverPasswordPage.propTypes = {
  user: PropTypes.object,
}

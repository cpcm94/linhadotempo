import React from 'react'
import { ChangePasswordForm } from '../_shared/ChangePasswordForm/ChangePasswordForm'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { UserInfoFields } from './UserInfoFields'
import { useHistory } from 'react-router-dom'

export const RecoverPasswordPage = ({ user }) => {
  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }

  return (
    <Layout>
      <Header title={'Recuperação de senha'} returnButton={navigateToHome} />
      <Container>
        <UserInfoFields user={user} />
        <ChangePasswordForm user={user} />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

RecoverPasswordPage.propTypes = {
  user: PropTypes.object,
}

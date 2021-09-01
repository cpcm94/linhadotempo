import React, { useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { LoginForm } from './LoginForm'
import PropTypes from 'prop-types'
import { RegisterForm } from './RegisterForm/RegisterForm'
import { Container } from '../_shared/Container'
import { ForgotPasswordForm } from './ForgotPasswordForm/ForgotPasswordForm'

export const LoginPage = ({ refetchUser }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [email, setEmail] = useState('')
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)
  const toggleShowRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm)
  }
  const toggleShowForgotPasswordForm = () => {
    setShowForgotPasswordForm(!showForgotPasswordForm)
  }
  const titleText = showRegisterForm
    ? 'Cria sua conta'
    : showForgotPasswordForm
    ? 'Esqueci minha senha'
    : 'Entrar'
  return (
    <Layout>
      <Header title={titleText} />
      <Container>
        {showRegisterForm ? (
          <RegisterForm refetchUser={refetchUser} />
        ) : showForgotPasswordForm ? (
          <ForgotPasswordForm email={email} setEmail={setEmail} />
        ) : (
          <LoginForm
            refetchUser={refetchUser}
            toggleShowRegisterForm={toggleShowRegisterForm}
            toggleShowForgotPasswordForm={toggleShowForgotPasswordForm}
            email={email}
            setEmail={setEmail}
          />
        )}
      </Container>
    </Layout>
  )
}

LoginPage.propTypes = {
  refetchUser: PropTypes.func,
}

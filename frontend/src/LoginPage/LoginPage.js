import React, { useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { LoginForm } from './LoginForm'
import PropTypes from 'prop-types'
import { RegisterForm } from './RegisterForm/RegisterForm'
import { Container } from '../_shared/Container'

export const LoginPage = ({ refetchUser }) => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  return (
    <Layout>
      <Header title={showLoginForm ? 'Entrar' : 'Registrar usuário'} />
      <Container>
        {showLoginForm ? (
          <LoginForm
            refetchUser={refetchUser}
            setShowLoginForm={setShowLoginForm}
          />
        ) : (
          <RegisterForm refetchUser={refetchUser} />
        )}
      </Container>
    </Layout>
  )
}

LoginPage.propTypes = {
  refetchUser: PropTypes.func,
}

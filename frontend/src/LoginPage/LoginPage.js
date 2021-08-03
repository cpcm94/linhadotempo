import React, { useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { LoginForm } from './LoginForm'
import PropTypes from 'prop-types'
import { RegisterForm } from './RegisterForm/RegisterForm'

export const LoginPage = ({ refetchUser }) => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  return (
    <Layout>
      <Header title={showLoginForm ? 'Entrar' : 'Registrar usuário'} />
      {showLoginForm ? (
        <LoginForm
          refetchUser={refetchUser}
          setShowLoginForm={setShowLoginForm}
        />
      ) : (
        <RegisterForm setShowLoginForm={setShowLoginForm} />
      )}
    </Layout>
  )
}

LoginPage.propTypes = {
  refetchUser: PropTypes.func,
}

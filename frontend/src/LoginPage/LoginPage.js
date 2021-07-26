import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { LoginForm } from './LoginForm'
import PropTypes from 'prop-types'

export const LoginPage = ({ refetchUser }) => {
  return (
    <Layout>
      <Header />
      <LoginForm refetchUser={refetchUser} />
    </Layout>
  )
}

LoginPage.propTypes = {
  refetchUser: PropTypes.func,
}

import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { LoginForm } from './LoginForm'

export const LoginPage = () => {
  return (
    <Layout>
      <Header />
      <LoginForm />
    </Layout>
  )
}

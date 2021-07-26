import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { UserInfo } from './UserInfo/UserInfo'
import { ToastContainer } from 'react-toastify'
import { ChangePasswordForm } from './ChangePasswordForm/ChangePasswordForm'
import { LogoutButton } from './LogoutButton/LogoutButton'
import { Wrapper } from './UserPage.styles'

export const UserPage = ({ user }) => {
  return (
    <Layout>
      <Header />
      <Wrapper>
        <UserInfo user={user} />
        <ChangePasswordForm user={user} />
      </Wrapper>
      <LogoutButton />
      <ToastContainer />
    </Layout>
  )
}

UserPage.propTypes = {
  user: PropTypes.object,
}

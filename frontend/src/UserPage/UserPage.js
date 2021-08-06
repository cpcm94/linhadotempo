import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { UserInfo } from './UserInfo/UserInfo'
import { ToastContainer } from 'react-toastify'
import { ChangePasswordForm } from '../_shared/ChangePasswordForm/ChangePasswordForm'
import { LogoutButton } from './LogoutButton/LogoutButton'
import { Wrapper } from './UserPage.styles'
import { Container } from '../_shared/Container'

export const UserPage = ({ user, refetchUser }) => {
  return (
    <Layout>
      <Header showMenuButton={true} />
      <Container>
        <Wrapper>
          <UserInfo user={user} />
          <ChangePasswordForm user={user} />
        </Wrapper>
        <LogoutButton refetchUser={refetchUser} />
      </Container>
      <ToastContainer />
    </Layout>
  )
}

UserPage.propTypes = {
  user: PropTypes.object,
  refetchUser: PropTypes.func,
}

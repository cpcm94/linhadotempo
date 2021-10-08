import React from 'react'
import { ChangePasswordForm } from '../_shared/ChangePasswordForm/ChangePasswordForm'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { UserInfoFields } from './UserInfoFields'
import { useHistory } from 'react-router-dom'
import { moveTouch } from '../_shared/moveTouch'
import { startTouch } from '../_shared/startTouch'
import { useState } from 'react'
import { useEffect } from 'react'

export const RecoverPasswordPage = ({ user }) => {
  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }

  const [initialX, setInitialX] = useState(null)

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, navigateToHome, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })
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

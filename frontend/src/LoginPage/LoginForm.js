import React, { useState } from 'react'
import { LOGIN_MUTATION } from './LOGIN_MUTATION'
import { useMutation } from '@apollo/client'
import { saveToken } from '../_shared/AuthToken/saveToken'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  StyledTextField,
  Wrapper,
  Form,
  StyledButton,
  RegisterText,
} from './LoginForm.styles'
import PropTypes from 'prop-types'

export const LoginForm = ({ refetchUser, setShowLoginForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  const navigateToHome = () => {
    history.push('/')
  }

  const saveTokenAndGoHome = (data) => {
    if (data.login.success) {
      saveToken(data.login.token)
      refetchUser()
      navigateToHome()
    } else {
      toast.error(data.login.message, {
        position: 'top-center',
        hideProgressBar: true,
        transition: Slide,
      })
    }
  }

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: { input: { email: email, password: password } },
    onError: (error) => {
      console.error(error.message)
      toast.error('Erro inesperado ao se comunicar com o servidor', {
        position: 'top-center',
        hideProgressBar: true,
        transition: Slide,
      })
    },
  })

  const handleLoginChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const submitSignIn = (e) => {
    e.preventDefault()
    login().then((response) => {
      saveTokenAndGoHome(response.data)
    })
  }

  return (
    <Wrapper>
      <Form onSubmit={submitSignIn}>
        <StyledTextField
          type="text"
          autoCapitalize="none"
          id="email"
          variant="outlined"
          label="Email"
          value={email}
          onChange={handleLoginChange}
        />
        <StyledTextField
          type="password"
          id="password"
          variant="outlined"
          label="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <StyledButton type="submit" variant="contained" id="submitSignInButton">
          Entrar
        </StyledButton>
        <RegisterText onClick={() => setShowLoginForm(false)}>
          Não possui uma conta? Registre-se
        </RegisterText>
        <ToastContainer />
      </Form>
    </Wrapper>
  )
}
LoginForm.propTypes = {
  refetchUser: PropTypes.func,
  setShowLoginForm: PropTypes.func,
}

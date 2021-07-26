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
  ForgotPasswordText,
} from './LoginForm.styles'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  const navigateToHome = () => {
    history.push('/')
  }

  const saveTokenAndGoHome = (data) => {
    if (data.login.success) {
      saveToken(data.login.token)
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
      <Form>
        <StyledTextField
          type="text"
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
        <StyledButton
          variant="contained"
          onClick={submitSignIn}
          id="submitSignInButton"
        >
          Entrar
        </StyledButton>
        <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
        <ToastContainer />
      </Form>
    </Wrapper>
  )
}

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
  FormText,
} from './LoginForm.styles'
import PropTypes from 'prop-types'
const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const LoginForm = ({
  refetchUser,
  toggleShowRegisterForm,
  toggleShowForgotPasswordForm,
}) => {
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
      toast.error(data.login.message, toastConfig)
    }
  }

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: { input: { email: email, password: password } },
    onError: (error) => {
      console.error(error.message)
      toast.error('Erro inesperado ao se comunicar com o servidor', toastConfig)
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
        <ToastContainer />
      </Form>
      <FormText onClick={toggleShowRegisterForm}>
        Não possui uma conta? Registre-se
      </FormText>
      <FormText onClick={toggleShowForgotPasswordForm}>
        Esqueceu sua senha?
      </FormText>
    </Wrapper>
  )
}
LoginForm.propTypes = {
  refetchUser: PropTypes.func,
  toggleShowRegisterForm: PropTypes.func,
  toggleShowForgotPasswordForm: PropTypes.func,
}

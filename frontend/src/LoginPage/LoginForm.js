import React, { useState } from 'react'
import { LOGIN_MUTATION } from './LOGIN_MUTATION'
import { useMutation } from '@apollo/client'
import { saveToken } from '../_shared/AuthToken/saveToken'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Form,
  Wrapper,
  Label,
  SubmitButton,
  ForgotPasswordText,
} from './LoginForm.styles'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  const navigateToHome = () => {
    history.push('/')
  }

  const afterComplete = (data) => {
    if (data && data.login.success) {
      saveToken(data.login.token)
      navigateToHome()
    }
  }

  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    variables: { input: { email: email, password: password } },
    onCompleted: afterComplete,
    onError: (error) => {
      console.log('error.message', error.message)
      if (error.message === 'Invalid credentials.') {
        toast.error('Email ou senha incorretos.', {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      } else {
        toast.error('Erro inesperado ao se comunicar com o servidor', {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
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
    login()
    afterComplete(data)
  }

  return (
    <Wrapper>
      <Form>
        <Label>Email:</Label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleLoginChange}
        />
        <Label>Senha:</Label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <SubmitButton onClick={submitSignIn}>Entrar</SubmitButton>
        <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
        <ToastContainer />
      </Form>
    </Wrapper>
  )
}

import styled from 'styled-components'
import React, { useState } from 'react'
import { LOGIN_MUTATION } from './LOGIN_MUTATION'
import { useMutation } from '@apollo/client'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: center;
`
const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`
const Label = styled.label`
  margin-bottom: 15px;
  margin-top: 15px;
`
const SubmitButton = styled.button`
  margin-top: 15px;
`
const ForgotPasswordText = styled.div`
  margin-top: 15px;
  min-width: 160px;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    variables: { email: email, password: password },
    onCompleted: () => {
      console.log('login completo')
      console.log('data', data)
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
    // afterComplete(data)
  }

  return (
    <Wrapper>
      <Form>
        <Label>Usuário:</Label>
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
      </Form>
    </Wrapper>
  )
}

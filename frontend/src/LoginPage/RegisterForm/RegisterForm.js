import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_USER_MUTATION } from './CREATE_USER_MUTATION'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
} from './RegisterForm.styles'

export const RegisterForm = () => {
  const [user, setUser] = useState({
    name: '',
    password: '',
    type: 'basic',
    email: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleChange = (userPropName) => (e) => {
    const newUser = { ...user }
    newUser[userPropName] = e.target.value
    setUser(newUser)
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      input: user,
    },
  })
  const handleSubmit = () => {
    createUser().then((res) => {
      console.log('res', res)
    })
  }

  const disableSubmitButton =
    user.password === '' || user.password.length !== confirmPassword.length
  return (
    <Wrapper>
      <Form
      //    onSubmit={handleSubmit}
      >
        <StyledTextField
          type="text"
          variant="outlined"
          label="Nome"
          onChange={handleChange('name')}
        />
        <StyledTextField
          type="email"
          variant="outlined"
          label="Email"
          onChange={handleChange('email')}
        />
        <StyledTextField
          type="password"
          variant="outlined"
          label="Senha"
          onChange={handleChange('password')}
        />
        <StyledTextField
          type="password"
          variant="outlined"
          label="Confirme a senha"
          onChange={handleConfirmPasswordChange}
        />
        {loading ? (
          <span>Loading...</span>
        ) : (
          <StyledButton
            disabled={disableSubmitButton}
            variant="contained"
            id="submitCreateButton"
            // type="submit"
            onClick={handleSubmit}
          >
            Criar Conta
          </StyledButton>
        )}
      </Form>
    </Wrapper>
  )
}

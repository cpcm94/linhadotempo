import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_USER_MUTATION } from './CREATE_USER_MUTATION'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
} from './RegisterForm.styles'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

export const RegisterForm = ({ setShowLoginForm }) => {
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
    onError: (error) => {
      error
    },
  })
  const handleSubmit = () => {
    if (confirmPassword !== user.password) {
      toast.error('Os dois campos de senha precisam ser iguais!', {
        position: 'top-center',
        hideProgressBar: true,
        transition: Slide,
      })
    }
    createUser().then((res) => {
      if (res.data) {
        window.alert('Usuário criado com sucesso!')
        setShowLoginForm(true)
      } else if (res.errors.message.startsWith('Validation')) {
        toast.error('Esse email já está cadastrado', {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
    })
  }

  const disableSubmitButton =
    user.password === '' || user.password.length !== confirmPassword.length
  return (
    <Wrapper>
      <Form>
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
            onClick={handleSubmit}
          >
            Criar Conta
          </StyledButton>
        )}
        <ToastContainer />
      </Form>
    </Wrapper>
  )
}

RegisterForm.propTypes = {
  setShowLoginForm: PropTypes.func,
}

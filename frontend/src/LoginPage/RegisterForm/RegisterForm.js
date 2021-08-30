import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_USER_MUTATION } from './CREATE_USER_MUTATION'
import { LOGIN_MUTATION } from '../LOGIN_MUTATION'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
} from './RegisterForm.styles'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'
import { saveToken } from '../../_shared/AuthToken/saveToken'
import PropTypes from 'prop-types'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}
export const RegisterForm = ({ refetchUser }) => {
  let history = useHistory()
  const navigateToTimelines = () => {
    history.push('/timelines')
  }
  const saveTokenAndGoToTimelines = (data) => {
    if (data.login.success) {
      saveToken(data.login.token)
      refetchUser()
      navigateToTimelines()
    } else {
      toast.error(data.login.message, toastConfig)
    }
  }

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
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: { input: { email: user.email, password: user.password } },
    onError: (error) => {
      console.error(error.message)
      toast.error('Erro inesperado ao se comunicar com o servidor', toastConfig)
    },
  })
  const handleSubmit = () => {
    if (confirmPassword !== user.password) {
      toast.error('Os dois campos de senha precisam ser iguais!', toastConfig)
    }
    createUser().then((res) => {
      if (res.data) {
        toast.success('Usuário criado com sucesso!', toastConfig)
        login().then((response) => {
          saveTokenAndGoToTimelines(response.data)
        })
        // setShowLoginForm(true)
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
  refetchUser: PropTypes.func,
}

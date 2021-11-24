import React from 'react'
import { useState } from 'react'
import {
  Form,
  StyledButton,
  StyledTextField,
  Wrapper,
} from './NewUserForm.styles'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from '../../_shared/CREATE_USER_MUTATION'
import { MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const NewUserForm = ({ navigateToUsers }) => {
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
      toast.error('Os dois campos de senha precisam ser iguais!', toastConfig)
    } else if (
      !user.email.includes('@') &&
      (!user.email.includes('.com') || !user.email.includes('.gov'))
    ) {
      toast.error('Email precisa ser válido', toastConfig)
    } else {
      createUser().then((res) => {
        if (res.data) {
          navigateToUsers()
        } else if (res.errors.message.startsWith('Validation')) {
          toast.error('Esse email já está cadastrado', {
            position: 'top-center',
            hideProgressBar: true,
            transition: Slide,
          })
        }
      })
    }
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
        <StyledTextField
          select
          id="userType"
          variant="outlined"
          label="Tipo de Usuário"
          value={user.type}
          onChange={handleChange('type')}
        >
          <MenuItem value={'basic'}>{'Básico'}</MenuItem>
          <MenuItem value={'admin'}>{'Administrador'}</MenuItem>
        </StyledTextField>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <StyledButton
            disabled={disableSubmitButton}
            variant="contained"
            id="submitCreateButton"
            onClick={handleSubmit}
          >
            Criar Usuário
          </StyledButton>
        )}
        <ToastContainer />
      </Form>
    </Wrapper>
  )
}

NewUserForm.propTypes = {
  navigateToUsers: PropTypes.func,
}

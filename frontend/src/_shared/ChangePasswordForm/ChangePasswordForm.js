import React, { useState } from 'react'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
} from './ChangePasswordForm.styles'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'
import { UPDATE_PASSWORD_MUTATION } from './UPDATE_PASSWORD_MUTATION'
import PropTypes from 'prop-types'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const ChangePasswordForm = ({ user }) => {
  const [userPassword, setUserPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [savePassword, { loading: savePasswordLoading }] = useMutation(
    UPDATE_PASSWORD_MUTATION,
    {
      variables: {
        id: user.id,
        input: { password: userPassword },
      },
    }
  )

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const submitSavePassword = (e) => {
    e.preventDefault()
    if (confirmPassword !== userPassword)
      return toast.error('As senhas precisam ser iguais!', toastConfig)

    savePassword().then((res) => {
      if (res.data.updatePassword) {
        return toast.success('Senha atualizada com sucesso!', toastConfig)
      } else {
        return toast.error('Falha ao trocar de senha', toastConfig)
      }
    })
  }
  const disableSubmitButton =
    userPassword === '' || userPassword.length !== confirmPassword.length
  return (
    <Wrapper>
      <StyledTextField
        type="password"
        id="password"
        variant="outlined"
        label="Senha"
        onChange={handlePasswordChange}
      />
      <StyledTextField
        type="password"
        id="confirmPassword"
        variant="outlined"
        label="Confirme a senha"
        onChange={handleConfirmPasswordChange}
      />
      {savePasswordLoading ? (
        <span>Loading...</span>
      ) : (
        <StyledButton
          disabled={disableSubmitButton}
          variant="contained"
          onClick={submitSavePassword}
          id="submitButton"
        >
          Alterar senha
        </StyledButton>
      )}
    </Wrapper>
  )
}

ChangePasswordForm.propTypes = {
  user: PropTypes.object,
}

import React, { useState } from 'react'
import { Wrapper, StyledTextField, StyledButton } from './EditUserForm.styles'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_MUTATION } from './UPDATE_USER_MUTATION'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const EditUserForm = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    type: user.type,
    email: user.email,
  })
  const handleChange = (userPropName) => (e) => {
    const newUser = { ...userInfo }
    newUser[userPropName] = e.target.value
    setUserInfo(newUser)
  }
  const [saveUser, { loading: saveUserLoading }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      variables: {
        id: user.id,
        input: userInfo,
      },
    }
  )
  const disableSubmitButton =
    userInfo.name.trim() === '' || userInfo.email.trim() === ''
  const submitSaveUser = (e) => {
    e.preventDefault()
    saveUser().then((res) => {
      if (res.data.updateUser) {
        return toast.success('Alterações salvas com sucesso!', toastConfig)
      } else if (res.errors.message.startsWith('Validation')) {
        toast.error('Esse email já está cadastrado', toastConfig)
      } else {
        return toast.error(
          'Falha ao atualizar informações de usuário',
          toastConfig
        )
      }
    })
  }
  return (
    <Wrapper>
      <StyledTextField
        type="text"
        id="userName"
        variant="outlined"
        label="Nome"
        value={userInfo.name}
        onChange={handleChange('name')}
      />
      <StyledTextField
        type="text"
        id="userEmail"
        variant="outlined"
        label="Email"
        value={userInfo.email}
        onChange={handleChange('email')}
      />
      <StyledTextField
        select
        id="userType"
        variant="outlined"
        label="Tipo de Usuário"
        value={userInfo.type}
        onChange={handleChange('type')}
      >
        <MenuItem value={'basic'}>{'Básico'}</MenuItem>
        <MenuItem value={'admin'}>{'Administrador'}</MenuItem>
        <MenuItem value={'premium'}>{'Premium'}</MenuItem>
      </StyledTextField>
      {saveUserLoading ? (
        <span>Loading...</span>
      ) : (
        <StyledButton
          disabled={disableSubmitButton}
          variant="contained"
          onClick={submitSaveUser}
          id="submitButton"
        >
          Salvar alterações
        </StyledButton>
      )}
    </Wrapper>
  )
}

EditUserForm.propTypes = {
  user: PropTypes.object,
}

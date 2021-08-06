import React from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, Wrapper } from './UserInfo.styles'

export const UserInfo = ({ user }) => {
  const userType =
    user.type === 'basic'
      ? 'Básico'
      : user.type === 'admin'
      ? 'Administrador'
      : 'Premium'
  return (
    <Wrapper>
      <StyledTextField
        type="text"
        id="userName"
        variant="outlined"
        label="Nome"
        value={user.name}
        disabled={true}
      />
      <StyledTextField
        type="text"
        id="userEmail"
        variant="outlined"
        label="Email"
        value={user.email}
        disabled={true}
      />
      <StyledTextField
        type="text"
        id="userType"
        variant="outlined"
        label="Tipo de Usuário"
        value={userType}
        disabled={true}
      />
    </Wrapper>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object,
}

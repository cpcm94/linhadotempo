import React, { useState } from 'react'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
} from './ForgotPasswordForm.styles'

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  return (
    <Wrapper>
      <Form>
        <StyledTextField
          type="text"
          autoCapitalize="none"
          variant="outlined"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <StyledButton type="submit" variant="contained" id="submitSignInButton">
          Confirmar
        </StyledButton>
      </Form>
    </Wrapper>
  )
}

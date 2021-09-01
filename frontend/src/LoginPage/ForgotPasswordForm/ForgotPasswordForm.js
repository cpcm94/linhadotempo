import React from 'react'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
  ConfirmationText,
} from './ForgotPasswordForm.styles'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { ADD_HASH_USER_MUTATION } from './ADD_HASH_USER_MUTATION'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const ForgotPasswordForm = ({ email, setEmail }) => {
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const [addHashUser, { data, loading }] = useMutation(ADD_HASH_USER_MUTATION, {
    variables: {
      input: { email: email },
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    addHashUser().then((res) => {
      if (res.data.addHashUser.success) {
        toast.success(res.data.addHashUser.message, toastConfig)
      } else {
        toast.error(res.data.addHashUser.message, toastConfig)
      }
    })
  }
  return (
    <Wrapper>
      {!data ? (
        <Form>
          <StyledTextField
            type="text"
            autoCapitalize="none"
            variant="outlined"
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {loading ? (
            <span>Loading...</span>
          ) : (
            <StyledButton
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              id="submitSignInButton"
            >
              Confirmar
            </StyledButton>
          )}
        </Form>
      ) : (
        <ConfirmationText>
          Enviamos para o seu email um link para troca de senha. Por favor
          clique neste link para trocar a sua senha. Não esqueça de verificar a
          caixa de spam.
        </ConfirmationText>
      )}
      <ToastContainer />
    </Wrapper>
  )
}

ForgotPasswordForm.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
}

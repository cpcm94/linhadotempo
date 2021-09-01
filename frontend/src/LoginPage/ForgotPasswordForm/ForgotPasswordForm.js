import React from 'react'
import {
  StyledTextField,
  StyledButton,
  Form,
  Wrapper,
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
  const [addHashUser] = useMutation(ADD_HASH_USER_MUTATION, {
    variables: {
      input: { email: email },
    },
  })
  const handleSubmit = () => {
    addHashUser.then((res) => {
      if (res.data.addHashUser.success) {
        toast.success(res.data.addHashUser.message, toastConfig)
      } else {
        toast.error(res.data.addHashUser.message, toastConfig)
      }
    })
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
        <StyledButton
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          id="submitSignInButton"
        >
          Confirmar
        </StyledButton>
      </Form>
      <ToastContainer />
    </Wrapper>
  )
}

ForgotPasswordForm.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
}

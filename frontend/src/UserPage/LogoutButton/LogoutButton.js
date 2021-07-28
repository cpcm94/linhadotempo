import { useMutation } from '@apollo/client'
import React from 'react'
import { StyledButton, Wrapper } from './LogoutButton.styles'
import { deleteToken } from '../../_shared/AuthToken/deleteToken'
import { LOGOUT_MUTATION } from './LOGOUT_MUTATION'
import { useHistory } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

export const LogoutButton = ({ refetchUser }) => {
  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION)
  let history = useHistory()

  const navigateToLogin = () => {
    history.push('/login')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout().then((res) => {
      if (res.data.logout.success) {
        deleteToken()
        refetchUser().then(() => {
          navigateToLogin()
        })
      } else {
        toast.error(res.data.logout.message, {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
    })
  }
  return (
    <Wrapper>
      {logoutLoading ? (
        <span>Loading...</span>
      ) : (
        <StyledButton
          variant="contained"
          onClick={handleLogout}
          id="logoutButton"
        >
          Deslogar
        </StyledButton>
      )}
    </Wrapper>
  )
}
LogoutButton.propTypes = {
  refetchUser: PropTypes.func,
}

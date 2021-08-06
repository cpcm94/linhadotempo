import React, { useState } from 'react'
import { ChangePasswordForm } from '../_shared/ChangePasswordForm/ChangePasswordForm'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { EditUserForm } from './EditUserForm.js/EditUserForm'
import { ToastContainer } from 'react-toastify'
import { DeleteButton } from '../_shared/DeleteButton'
import { useMutation } from '@apollo/client'
import { DELETE_USER_MUTATION } from './DELETE_USER_MUTATION'
import { useHistory } from 'react-router-dom'
import { DeleteButtonWrapper } from './DeleteButtonWrapper'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const EditableUser = ({ user }) => {
  let history = useHistory()
  const navigateToUsersPage = () => {
    history.push('/users')
  }
  const [deleteUser, { loading: deleteUserLoading }] = useMutation(
    DELETE_USER_MUTATION,
    {
      variables: { id: user.id },
    }
  )
  const [firstClick, setFirstClick] = useState(true)

  const handleClick = () => {
    if (firstClick) {
      alert(
        'Ao deletar o usuário você estará também deletando TODAS as linhas do tempo associadas a ele e também TODOS os acontecimentos associdados às respectivas linhas do tempo. Caso queira continuar clique no botão de delete novamente.'
      )
      setFirstClick(false)
    } else {
      const response = window.confirm('Tem certeza? Isso será irreversível!')
      response &&
        deleteUser().then((res) => {
          if (res.data.deleteUser.success) {
            navigateToUsersPage()
          } else {
            return toast.error(res.data.deleteUser.message, {
              position: 'top-center',
              hideProgressBar: true,
              transition: Slide,
            })
          }
        })
    }
  }
  return (
    <Layout>
      <Header showMenuButton={true} />
      <Container>
        <EditUserForm user={user} />
        <ChangePasswordForm user={user} />
        {deleteUserLoading ? (
          <span>Loading...</span>
        ) : (
          <DeleteButtonWrapper>
            <DeleteButton
              onClick={handleClick}
              color={!firstClick ? 'red' : null}
            />
          </DeleteButtonWrapper>
        )}
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditableUser.propTypes = {
  user: PropTypes.object,
}

import React from 'react'
import { DeleteButton } from '../DeleteButton'
import {
  ConfirmationWrapper,
  ConfirmButton,
  ConfirmButtonsWrapper,
  DeleteButtonWrapper,
} from './DeleteButtonAndConfirmation.styles'
import PropTypes from 'prop-types'

export const DeleteButtonAndConfirmation = ({
  deleteMessage,
  skipDeleteMessage,
  showDeleteMessage,
  setShowDeleteMessage,
  deleteFunction,
  loading,
}) => {
  const handleFirstDeleteClick = () => {
    if (!skipDeleteMessage) {
      setShowDeleteMessage(true)
    } else {
      deleteFunction()
    }
  }

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : !showDeleteMessage ? (
        <DeleteButtonWrapper showBorder={true}>
          <DeleteButton onClick={handleFirstDeleteClick} />
        </DeleteButtonWrapper>
      ) : (
        <ConfirmationWrapper>
          <span>{deleteMessage}</span>
          <ConfirmButtonsWrapper>
            <ConfirmButton onClick={deleteFunction} variant="contained">
              SIM
            </ConfirmButton>
            <ConfirmButton
              onClick={() => setShowDeleteMessage(false)}
              variant="contained"
            >
              NÃO
            </ConfirmButton>
          </ConfirmButtonsWrapper>
        </ConfirmationWrapper>
      )}
    </>
  )
}

DeleteButtonAndConfirmation.propTypes = {
  deleteMessage: PropTypes.string,
  skipDeleteMessage: PropTypes.bool,
  showDeleteMessage: PropTypes.bool,
  setShowDeleteMessage: PropTypes.func,
  deleteFunction: PropTypes.func,
  loading: PropTypes.bool,
}

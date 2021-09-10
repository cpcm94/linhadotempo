import React from 'react'
import { DeleteButton } from '../DeleteButton'
import {
  ConfirmationWrapper,
  ConfirmButton,
  ConfirmButtonsWrapper,
} from './TimelineForm.styles'
import PropTypes from 'prop-types'

export const DeleteButtonAndConfirmation = ({
  deleteMessage,
  skipDeleteMessage,
  showDeleteMessage,
  setShowDeleteMessage,
}) => {
  const handleFirstDeleteClick = () => {
    if (!skipDeleteMessage) {
      setShowDeleteMessage(true)
    } else {
      deleteTimeline()
    }
  }

  return (
    <>
      {!showDeleteMessage ? (
        <DeleteButton onClick={handleFirstDeleteClick} />
      ) : (
        <ConfirmationWrapper>
          <span>{deleteMessage}</span>
          <ConfirmButtonsWrapper>
            <ConfirmButton onClick={deleteTimeline} variant="contained">
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
}

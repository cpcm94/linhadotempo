import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, TextFieldColor, StyledButton } from './TimelineForm.styles'

export const TimelineForm = ({
  timelineName,
  setTimelineName,
  loading,
  onClick,
  buttonMessage,
}) => {
  const handleNameChange = (e) => {
    setTimelineName(e.target.value)
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Wrapper>
            <TextFieldColor
              type="text"
              id="timeline"
              variant="outlined"
              label="Nome"
              value={timelineName}
              onChange={handleNameChange}
            />
            {buttonMessage && (
              <StyledButton variant="contained" onClick={onClick}>
                {buttonMessage}
              </StyledButton>
            )}
          </Wrapper>
        </>
      )}
    </>
  )
}

TimelineForm.propTypes = {
  timeline: PropTypes.object,
  timelineName: PropTypes.string,
  setTimelineName: PropTypes.func,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  buttonMessage: PropTypes.string,
}

import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, TextFieldColor, StyledButton } from './TimelineForm.styles'
import { colors } from '../colors'

export const TimelineForm = ({
  timelineName,
  setTimelineName,
  loading,
  onClick,
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
              color={colors.brown}
              value={timelineName}
              onChange={handleNameChange}
            />
            <StyledButton variant="contained" onClick={onClick}>
              Salvar
            </StyledButton>
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
}

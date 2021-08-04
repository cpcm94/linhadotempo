import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  TextFieldColor,
  StyledButton,
  Form,
  Icon,
} from './TimelineForm.styles'

export const TimelineForm = ({
  timeline,
  setTimeline,
  loading,
  onClick,
  buttonMessage,
}) => {
  const inputProps = {
    maxLength: 3,
  }
  const handleChange = (timelinePropName) => (e) => {
    const newTimeline = { ...timeline }
    newTimeline[timelinePropName] = e.target.value
    setTimeline(newTimeline)
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Wrapper>
            <Form>
              <TextFieldColor
                type="text"
                id="timeline"
                variant="outlined"
                label="Nome"
                value={timeline.name}
                onChange={handleChange('name')}
              />
              <TextFieldColor
                type="text"
                id="timelineInitial"
                variant="outlined"
                label="Sigla"
                inputProps={inputProps}
                value={timeline.initials}
                onChange={handleChange('initials')}
              />
              <TextFieldColor
                type="color"
                id="timelineColor"
                variant="outlined"
                label="Cor"
                value={timeline.color}
                onChange={handleChange('color')}
              />
              <Icon color={timeline.color}>{timeline.initials}</Icon>
            </Form>
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
  setTimeline: PropTypes.func,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  buttonMessage: PropTypes.string,
}

import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  TextFieldColor,
  StyledButton,
  Form,
} from './NewTimelineForm.styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconDisplay } from '../../_shared/IconDisplay/IconDisplay'

export const NewTimelineForm = ({
  timeline,
  setTimeline,
  onClick,
  buttonMessage,
}) => {
  const handleChange = (timelinePropName) => (e) => {
    const newTimeline = { ...timeline }
    newTimeline[timelinePropName] = e.target.value
    setTimeline(newTimeline)
  }

  const handleChangeColor = (color) => {
    const newTimeline = { ...timeline }
    newTimeline.color = color.hex
    setTimeline(newTimeline)
  }

  const updateTimelineIconImageUrl = (url) => {
    const newTimeline = { ...timeline }
    newTimeline.timelineIconImageUrl = url
    setTimeline(newTimeline)
  }

  return (
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
        <IconDisplay
          timeline={timeline}
          handleChange={handleChange}
          handleChangeColor={handleChangeColor}
          updateTimelineIconImageUrl={updateTimelineIconImageUrl}
        />
      </Form>
      {buttonMessage && (
        <StyledButton variant="contained" onClick={onClick}>
          {buttonMessage}
        </StyledButton>
      )}
      <ToastContainer />
    </Wrapper>
  )
}

NewTimelineForm.propTypes = {
  timeline: PropTypes.object,
  setTimeline: PropTypes.func,
  onClick: PropTypes.func,
  buttonMessage: PropTypes.string,
}

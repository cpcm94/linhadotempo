import React from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonWrapper } from './AddTimelineButton.styles'

export const AddTimelineButton = () => {
  let history = useHistory()

  const navigateToAddTimelinePage = () => {
    history.push('/newTimeline')
  }
  return <ButtonWrapper onClick={navigateToAddTimelinePage}>+</ButtonWrapper>
}

import React, { useState } from 'react'
import { UserTimelines } from './UserTimelines'
import PropTypes from 'prop-types'
import {
  Wrapper,
  NewTimelineWrapper,
  NewTimelineNameWrapper,
  BottomContainer,
  NewTimelineLabel,
} from './TimelineForm.styles'
import { Layout } from '../Layout'

export const TimelineForm = ({ user }) => {
  const [timelineName, setTimelineName] = useState('')
  const handleNameChange = (e) => {
    setTimelineName(e.target.value)
  }
  return (
    <Layout>
      <Wrapper>
        <NewTimelineWrapper>
          <NewTimelineLabel>Linha do tempo: </NewTimelineLabel>
          <NewTimelineNameWrapper
            type="text"
            id="timeline"
            value={timelineName}
            onChange={handleNameChange}
          />
        </NewTimelineWrapper>
        <BottomContainer>
          <UserTimelines timelines={user.timelines} />
        </BottomContainer>
      </Wrapper>
    </Layout>
  )
}

TimelineForm.propTypes = {
  user: PropTypes.object,
}

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { TimelineForm } from '../_shared/TimelineForm/TimelineForm'
import { UpdateTimelineButton } from './UpdateTimelineButton'
import { UPDATE_TIMELINE_MUTATION } from './UPDATE_TIMELINE_MUTATION'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router'

export const EditableTimeline = ({ timeline }) => {
  const [timelineName, setTimelineName] = useState(timeline.name)
  let history = useHistory()

  const navigateToTimelinesPage = () => {
    history.push('/timelines')
  }

  const [updateTimeline, { loading }] = useMutation(UPDATE_TIMELINE_MUTATION, {
    variables: { id: timeline.id, input: { name: timelineName } },
    onCompleted: navigateToTimelinesPage,
  })
  return (
    <Layout>
      <TimelineForm
        timelineName={timelineName}
        setTimelineName={setTimelineName}
        loading={loading}
      />
      <Footer pageActions={<UpdateTimelineButton onClick={updateTimeline} />} />
    </Layout>
  )
}

EditableTimeline.propTypes = {
  timeline: PropTypes.object,
}

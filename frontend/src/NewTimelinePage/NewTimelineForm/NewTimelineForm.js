import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Form, DeleteButtonWrapper } from './NewTimelineForm.styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconDisplay } from '../../_shared/IconDisplay/IconDisplay'
import { TimelineCategorySelect } from '../../_shared/TimelineCategorySelect/TimelineCategorySelect'
import { useMutation } from '@apollo/client'
import { DELETE_TIMELINE_MUTATION } from '../../_shared/DELETE_TIMELINE_MUTATION'
import { DeleteButton } from '../../_shared/DeleteButton'
import { useHistory } from 'react-router'
import { TimelineNameField } from '../../_shared/TimelineNameField/TimelineNameField'

export const NewTimelineForm = ({
  timeline,
  setTimeline,
  timelineError,
  bucketName,
  timelineCategories,
  timelineId,
  selectedTimelines,
}) => {
  let history = useHistory()
  const navigateToTimelines = () => {
    history.push(
      `/timelines${selectedTimelines && `?timelines=${selectedTimelines}`}`
    )
  }
  const [deleteTimeline, { loading }] = useMutation(DELETE_TIMELINE_MUTATION, {
    variables: { id: timelineId },
  })
  const handleDelete = () => {
    deleteTimeline().then((res) => {
      if (res.data) navigateToTimelines()
    })
  }

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

  const resetName = () => {
    const newTimeline = { ...timeline }
    newTimeline.name = ''
    setTimeline(newTimeline)
  }

  const resetSelectedTimelineCategories = () => {
    const newTimeline = { ...timeline }
    newTimeline.timeline_categories.sync = []
    setTimeline(newTimeline)
  }
  return (
    <Wrapper>
      <Form>
        <TimelineNameField
          resetField={resetName}
          timelineName={timeline.name}
          handleChange={handleChange}
          timelineError={timelineError}
        />
        <IconDisplay
          timeline={timeline}
          handleChange={handleChange}
          handleChangeColor={handleChangeColor}
          updateTimelineIconImageUrl={updateTimelineIconImageUrl}
          bucketName={bucketName}
        />
        <TimelineCategorySelect
          timeline={timeline}
          setTimeline={setTimeline}
          resetField={resetSelectedTimelineCategories}
          timelineCategories={timelineCategories}
        />
        <DeleteButtonWrapper showBorder={timelineId}>
          {timelineId &&
            (loading ? (
              <span>Loading...</span>
            ) : (
              <DeleteButton onClick={handleDelete} />
            ))}
        </DeleteButtonWrapper>
      </Form>
      <ToastContainer />
    </Wrapper>
  )
}

NewTimelineForm.propTypes = {
  timeline: PropTypes.object,
  setTimeline: PropTypes.func,
  bucketName: PropTypes.string,
  timelineCategories: PropTypes.array,
  timelineId: PropTypes.string,
  selectedTimelines: PropTypes.array,
  timelineError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

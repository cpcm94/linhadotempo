import React, { useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { useMutation } from '@apollo/client'
import { CREATE_TIMELINE_MUTATION } from './CREATE_TIMELINE_MUTATION'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import qs from 'query-string'
import { NewTimelineForm } from './NewTimelineForm/NewTimelineForm'
import PropTypes from 'prop-types'
import { UPDATE_TIMELINE_MUTATION } from '../_shared/UPDATE_TIMELINE_MUTATION'
import { useRef } from 'react'
import { checkIfTimelineError } from '../_shared/checkIfTimelineError'
import { useEffect } from 'react'
import { moveTouch } from '../_shared/moveTouch'
import { startTouch } from '../_shared/startTouch'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

const returnToTimelinesPath = (selectedTimelinesFromUrl, timelineId) => {
  if (selectedTimelinesFromUrl && timelineId) {
    return `/timelines${`?timelines=${selectedTimelinesFromUrl},${timelineId}`}`
  } else if (selectedTimelinesFromUrl) {
    return `/timelines${`?timelines=${selectedTimelinesFromUrl}`}`
  } else if (timelineId) {
    return `/timelines${`?timelines=${timelineId}`}`
  } else {
    return '/timelines'
  }
}

export const NewTimelinePage = ({ bucketName, timelineCategories }) => {
  const [timeline, setTimeline] = useState({
    name: '',
    color: '',
    initials: '',
    timelineIconImageUrl: '',
    timeline_categories: { sync: [] },
  })

  const [initialX, setInitialX] = useState(null)
  const [timelineId, setTimelineId] = useState(false)

  const isFirstRun = useRef(true)

  let history = useHistory()

  const selectedTimelinesFromUrl = qs.parse(location.search).timelines

  const [createTimeline, { loading }] = useMutation(CREATE_TIMELINE_MUTATION)
  const [updateTimeline, { loading: updateLoading }] = useMutation(
    UPDATE_TIMELINE_MUTATION
  )
  const timelineError = checkIfTimelineError(timeline)
  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!timelineError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: timelineId,
              input: timeline,
            },
          }
          if (timelineId) {
            updateTimeline(payload)
          } else {
            createTimeline(payload).then((res) => {
              if (res.data.createTimeline && !timelineId) {
                setTimelineId(res.data.createTimeline.id)
              }
            })
          }
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [createTimeline, timeline, timelineError, timelineId, updateTimeline])

  const saveAndReturn = () => {
    const path = returnToTimelinesPath(selectedTimelinesFromUrl, timelineId)
    history.push(path)
  }

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, saveAndReturn, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })
  const isLoading = loading || updateLoading

  return (
    <Layout>
      <Header
        title={'Criar linha do tempo'}
        loading={isLoading}
        returnButton={saveAndReturn}
      />
      <Container>
        <NewTimelineForm
          timeline={timeline}
          setTimeline={setTimeline}
          timelineError={timelineError}
          timelineCategories={timelineCategories}
          timelineId={timelineId}
          selectedTimelines={selectedTimelinesFromUrl}
          bucketName={bucketName}
        />
      </Container>
    </Layout>
  )
}

NewTimelinePage.propTypes = {
  bucketName: PropTypes.string,
  timelineCategories: PropTypes.array,
}

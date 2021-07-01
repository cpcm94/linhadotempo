import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { TimelineForm } from '../_shared/TimelineForm/TimelineForm'
import { UPDATE_TIMELINE_MUTATION } from './UPDATE_TIMELINE_MUTATION'
import { useMutation } from '@apollo/client'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableTimeline = ({ timeline }) => {
  const isFirstRun = useRef(true)

  const [timelineName, setTimelineName] = useState(timeline.name)

  const [updateTimeline, { loading }] = useMutation(UPDATE_TIMELINE_MUTATION)

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: timeline.id,
            input: {
              name: timelineName,
            },
          },
        }
        updateTimeline(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [updateTimeline, timeline.id, timelineName])

  return (
    <Layout>
      <Header
        returnButton={true}
        subTitle={'Editar linha do tempo'}
        title={timelineName}
        loading={loading}
      />
      <TimelineForm
        timelineName={timelineName}
        setTimelineName={setTimelineName}
      />
    </Layout>
  )
}

EditableTimeline.propTypes = {
  timeline: PropTypes.object,
}

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { TimelineForm } from '../_shared/TimelineForm/TimelineForm'
import { UPDATE_TIMELINE_MUTATION } from './UPDATE_TIMELINE_MUTATION'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableTimeline = ({ timeline }) => {
  const entriesInfo = timeline.time_entries.map((entry) => {
    return `${entry.name}\t${entry.year ? entry.year : ''}\t${
      entry.month ? entry.month : ''
    }\t${entry.day ? entry.day : ''}`
  })
  let history = useHistory()

  const goBackToPreviousPage = () => {
    history.goBack()
  }

  const isFirstRun = useRef(true)

  const [timelineObject, setTimelineObject] = useState({
    id: timeline.id,
    name: timeline.name,
    color: timeline.color ? timeline.color : '',
    initials: timeline.initials ? timeline.initials : '',
  })

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
            input: timelineObject,
          },
        }
        updateTimeline(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [updateTimeline, timeline.id, timelineObject])

  return (
    <Layout>
      <Header
        returnButton={goBackToPreviousPage}
        subTitle={'Editar linha do tempo'}
        title={timelineObject.name}
        loading={loading}
      />
      <Container>
        <TimelineForm
          timeline={timelineObject}
          setTimeline={setTimelineObject}
          entriesStringInfo={entriesInfo}
        />
      </Container>
    </Layout>
  )
}

EditableTimeline.propTypes = {
  timeline: PropTypes.object,
}

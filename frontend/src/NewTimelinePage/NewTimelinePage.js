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

export const NewTimelinePage = ({ bucketName }) => {
  const [timeline, setTimeline] = useState({
    name: '',
    color: '',
    initials: '',
  })
  let history = useHistory()

  const selectedTimelinesFromUrl = qs.parse(location.search).timelines

  const navigateToTimelinesPage = () => {
    history.push(
      `/timelines${
        selectedTimelinesFromUrl ? `?timelines=${selectedTimelinesFromUrl}` : ''
      }`
    )
  }

  const [saveTimeline, { loading }] = useMutation(CREATE_TIMELINE_MUTATION, {
    variables: { input: timeline },
  })

  const saveAndReturn = () => {
    saveTimeline().then((res) => {
      history.push(
        `/timelines${
          selectedTimelinesFromUrl
            ? `?timelines=${selectedTimelinesFromUrl},${res.data.createTimeline.id}`
            : `?timelines=${res.data.createTimeline.id}`
        }`
      )
    })
  }

  return (
    <Layout>
      <Header
        title={'Criar linha do tempo'}
        loading={loading}
        returnButton={navigateToTimelinesPage}
      />
      <Container>
        <NewTimelineForm
          timeline={timeline}
          setTimeline={setTimeline}
          onClick={saveAndReturn}
          buttonMessage={'Criar linha do tempo'}
          bucketName={bucketName}
        />
      </Container>
    </Layout>
  )
}

NewTimelinePage.propTypes = {
  bucketName: PropTypes.string,
}

import React, { useState } from 'react'
import { TimelineForm } from '../_shared/TimelineForm/TimelineForm'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { useMutation } from '@apollo/client'
import { CREATE_TIMELINE_MUTATION } from './CREATE_TIMELINE_MUTATION'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'

export const NewTimelinePage = () => {
  const [timelineName, setTimelineName] = useState('')
  let history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  const navigateToTimelinesPage = () => {
    history.push('/timelines')
  }

  const [saveTimeline, { loading }] = useMutation(CREATE_TIMELINE_MUTATION, {
    variables: { input: { name: timelineName } },
    onCompleted: navigateToTimelinesPage,
  })

  return (
    <Layout>
      <Header
        title={'Criar linha do tempo'}
        loading={loading}
        returnButton={goBack}
      />
      <Container>
        <TimelineForm
          timelineName={timelineName}
          setTimelineName={setTimelineName}
          onClick={saveTimeline}
          buttonMessage={'Criar linha do tempo'}
        />
      </Container>
    </Layout>
  )
}

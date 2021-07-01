import React, { useState } from 'react'
import { TimelineForm } from '../_shared/TimelineForm/TimelineForm'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { CREATE_TIMELINE_MUTATION } from './CREATE_TIMELINE_MUTATION'
import { useHistory } from 'react-router-dom'

export const NewTimelinePage = ({ user }) => {
  const [timelineName, setTimelineName] = useState('')
  let history = useHistory()

  const navigateToTimelinesPage = () => {
    history.push('/timelines')
  }

  const [saveTimeline, { loading }] = useMutation(CREATE_TIMELINE_MUTATION, {
    variables: { input: { name: timelineName, user_id: user.me.id } },
    onCompleted: navigateToTimelinesPage,
  })

  return (
    <Layout>
      <Header title={'Criar linha do tempo'} loading={loading} />
      <TimelineForm
        timelineName={timelineName}
        setTimelineName={setTimelineName}
        onClick={saveTimeline}
      />
    </Layout>
  )
}

NewTimelinePage.propTypes = {
  timelines: PropTypes.array,
  user: PropTypes.object,
}

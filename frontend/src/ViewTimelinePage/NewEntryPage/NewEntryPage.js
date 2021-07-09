import React from 'react'
import { TimeEntryForm } from './TimeEntryForm/TimeEntryForm'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export const NewEntryPage = ({ timelines, refetchTimelines }) => {
  let history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <Layout>
      <Header
        title={'Acontecimento'}
        subTitle={'Criar Acontecimento'}
        returnButton={goBack}
      />
      <TimeEntryForm
        timelines={timelines}
        refetchTimelines={refetchTimelines}
      />
    </Layout>
  )
}

NewEntryPage.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
}

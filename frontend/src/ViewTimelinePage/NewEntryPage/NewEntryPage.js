import React from 'react'
import { TimeEntryForm } from '../TimeEntryForm/TimeEntryForm'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../_shared/Container'

export const NewEntryPage = ({ timelines, refetchTimelines, defaultDate }) => {
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
      <Container>
        <TimeEntryForm
          timelines={timelines}
          refetchTimelines={refetchTimelines}
          defaultDate={defaultDate}
        />
      </Container>
    </Layout>
  )
}

NewEntryPage.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  defaultDate: PropTypes.object,
}

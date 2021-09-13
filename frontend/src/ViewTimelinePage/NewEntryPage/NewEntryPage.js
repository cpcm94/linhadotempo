import React from 'react'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../_shared/Container'
import { NewEntryForm } from './NewEntryForm/NewEntryForm'

export const NewEntryPage = ({
  timelines,
  refetchTimelines,
  defaultEntryData,
}) => {
  let history = useHistory()
  const goBack = () => {
    history.push(`/viewTimeline/${location.search}`)
  }
  return (
    <Layout>
      <Header title={'Acontecimento'} returnButton={goBack} />
      <Container>
        <NewEntryForm
          timelines={timelines}
          refetchTimelines={refetchTimelines}
          defaultEntryData={defaultEntryData}
        />
      </Container>
    </Layout>
  )
}

NewEntryPage.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  defaultEntryData: PropTypes.object,
}

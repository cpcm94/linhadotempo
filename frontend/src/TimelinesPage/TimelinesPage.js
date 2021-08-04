import React from 'react'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { AddTimelineButton } from './AddTimelineButton/AddTimelineButton'
import PropTypes from 'prop-types'
import { Container } from '../_shared/Container'

export const TimelinesPage = ({ timelines }) => {
  return (
    <Layout>
      <Header
        title={'Linhas do Tempo'}
        pageActions={<AddTimelineButton />}
        showMenuButton={true}
      />
      <Container>
        <TimelinesList timelines={timelines} />
      </Container>
    </Layout>
  )
}

TimelinesPage.propTypes = {
  timelines: PropTypes.array,
}

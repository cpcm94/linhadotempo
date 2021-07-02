import React from 'react'
import { TimelinesList } from '../_shared/TimelinesList/TimelinesList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { AddTimelineButton } from './AddTimelineButton/AddTimelineButton'
import PropTypes from 'prop-types'

export const TimelinesPage = ({ timelines }) => {
  return (
    <Layout>
      <Header title={'Linhas do Tempo'} pageActions={<AddTimelineButton />} />
      <TimelinesList timelines={timelines} />
    </Layout>
  )
}

TimelinesPage.propTypes = {
  timelines: PropTypes.array,
}

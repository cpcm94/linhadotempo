import React from 'react'
import { TimelinesList } from '../_shared/TimelinesList/TimelinesList'
import { Footer } from '../_shared/Footer/Footer'
import { Layout } from '../_shared/Layout'
import { AddTimelineButton } from './AddTimelineButton/AddTimelineButton'
import PropTypes from 'prop-types'

export const TimelinesPage = ({ timelines }) => {
  return (
    <Layout>
      <TimelinesList timelines={timelines} />
      <Footer pageActions={<AddTimelineButton />} />
    </Layout>
  )
}

TimelinesPage.propTypes = {
  timelines: PropTypes.array,
}

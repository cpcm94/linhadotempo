import React from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import PropTypes from 'prop-types'
import { TimelineScroller } from '../_shared/TimelineScroller/TimelineScroller'

export const TimelinePage = ({ timelines }) => {
  const timelinesArray = () => {
    let timelineArray = []
    if (Array.isArray(timelines)) {
      return timelines
    } else {
      timelineArray.push(timelines)
      return timelineArray
    }
  }
  return (
    <Layout>
      <TimelineScroller timelines={timelinesArray()} />
      <Footer />
    </Layout>
  )
}

TimelinePage.propTypes = {
  timelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

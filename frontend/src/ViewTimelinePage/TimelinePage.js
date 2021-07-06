import React from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { Button } from './Button'
import { EllipsisButton } from '../_shared/EllipsisButton'
import PropTypes from 'prop-types'
import { TimelineScroller } from '../_shared/TimelineScroller/TimelineScroller'
import { colors } from '../_shared/colors'

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
      <Footer
        pageActions={
          <>
            <Button>+</Button>
            <EllipsisButton color={colors.white} />
            {timelinesArray().map((timeline) => (
              <Button key={timeline.id}>{timeline.id}</Button>
            ))}
          </>
        }
      />
    </Layout>
  )
}

TimelinePage.propTypes = {
  timelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

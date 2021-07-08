import React from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { Button } from './Button'
import { EllipsisButton } from '../_shared/EllipsisButton'
import PropTypes from 'prop-types'
import { TimelineScroller } from './TimelineScroller/TimelineScroller'
import { colors } from '../_shared/colors'
import { useHistory } from 'react-router-dom'

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

  let history = useHistory()

  const timelinesString = timelinesArray()
    .map((timeline) => timeline.id)
    .toString()

  const navigateToSelectTimelines = () => {
    history.push({
      pathname: '/viewTimeline/select/',
      search: `?timelines=${timelinesString}`,
    })
  }

  return (
    <Layout>
      <TimelineScroller timelines={timelinesArray()} />
      <Footer
        pageActions={
          <>
            <Button>+</Button>
            <EllipsisButton
              color={colors.white}
              onClick={navigateToSelectTimelines}
            />
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

import React, { useState } from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { Button } from './Button'
import { EllipsisButton } from '../_shared/EllipsisButton'
import PropTypes from 'prop-types'
import { TimelineScroller } from './TimelineScroller/TimelineScroller'
import { colors } from '../_shared/colors'
import { useHistory } from 'react-router-dom'
import { TimelinesButtonsRow } from './TimelinesButtonsRow'

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

  const [visibleTimelines, setVisibleTimelines] = useState(timelinesArray())

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

  const navigateToNewEntryPage = () => {
    history.push({
      pathname: '/viewTimeline/newEntry/',
      search: `?timelines=${timelinesString}`,
    })
  }

  return (
    <Layout>
      <TimelineScroller visibleTimelines={visibleTimelines} />
      <Footer
        pageActions={
          <>
            <Button onClick={navigateToNewEntryPage}>+</Button>
            <EllipsisButton
              color={colors.white}
              onClick={navigateToSelectTimelines}
            />
            <TimelinesButtonsRow
              timelines={timelinesArray()}
              visibleTimelines={visibleTimelines}
              setVisibleTimelines={setVisibleTimelines}
            />
          </>
        }
      />
    </Layout>
  )
}

TimelinePage.propTypes = {
  timelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

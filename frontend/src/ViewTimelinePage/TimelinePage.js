import React, { useEffect, useState } from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { Button } from './Button'
import { EllipsisButton } from '../_shared/EllipsisButton'
import PropTypes from 'prop-types'
import { TimelineScroller } from './TimelineScroller/TimelineScroller'
import { colors } from '../_shared/colors'
import { useHistory } from 'react-router-dom'
import { TimelinesButtonsRow } from './TimelinesButtonsRow'
import { AddButtonWrapper, EllipsisButtonsWrapper } from './TimelinePage.styles'

export const TimelinePage = ({ timelines, previousTimelines }) => {
  const oldEntry =
    previousTimelines &&
    previousTimelines
      .map((timeline) => timeline.time_entries.map((entry) => entry.id))
      .flat()

  const newEntry = timelines
    .map((timeline) => timeline.time_entries.map((entry) => entry.id))
    .flat()

  const brandNewEntry =
    oldEntry[0] && newEntry.filter((entry) => !oldEntry.includes(entry))[0]

  const [visibleTimelines, setVisibleTimelines] = useState(timelines)

  let history = useHistory()

  const timelinesString = timelines.map((timeline) => timeline.id).toString()

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

  useEffect(() => {
    const hash = window.location.hash
    const element = hash && document.getElementById(hash.substr(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  console.log('timelines', timelines)

  return (
    <Layout>
      <TimelineScroller
        visibleTimelines={visibleTimelines}
        newEntryId={brandNewEntry}
      />
      <Footer
        pageActions={
          <>
            <EllipsisButtonsWrapper>
              <EllipsisButton
                color={colors.white}
                onClick={navigateToSelectTimelines}
              />
            </EllipsisButtonsWrapper>
            <AddButtonWrapper>
              <Button onClick={navigateToNewEntryPage}>+</Button>
            </AddButtonWrapper>
            <TimelinesButtonsRow
              timelines={timelines}
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
  previousTimelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  IconAndNameWrapper,
  Img,
  EditButtonWrapper,
  CategoryTag,
  CategoryTags,
} from './TimelinesList.styles'
import { sortArrayAlphabeticallyByProp } from '../../_shared/sortArrayAlphabeticallyByProp'
import { EditButton } from '../../_shared/EditButton'
import { useHistory } from 'react-router'
import qs from 'query-string'
import Bugsnag from '@bugsnag/js'

export const TimelinesList = ({
  timelines,
  setSelectedTimelines,
  selectedTimelines,
  bucketName,
}) => {
  const selectedTimelinesFromUrl = qs.parse(location.search).timelines

  const arraySelectedTimelinesId = selectedTimelines.map(
    (timeline) => timeline.id
  )
  Bugsnag.notify(new Error('Test error'))

  const toggleTimelines = (_, timeline) => {
    if (arraySelectedTimelinesId.includes(timeline.id)) {
      setSelectedTimelines(
        selectedTimelines.filter(
          (timelineItem) => timelineItem.id !== timeline.id
        )
      )
    } else {
      setSelectedTimelines([...selectedTimelines, timeline])
    }
  }

  const sortedTimelinesAlphabetically = sortArrayAlphabeticallyByProp(
    'name',
    timelines
  )
  let history = useHistory()
  const navigateToEditTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(
      `/editTimeline/${timelineId}${
        selectedTimelinesFromUrl ? `?timelines=${selectedTimelinesFromUrl}` : ''
      }${window.location.hash}`
    )
  }
  return (
    <TimelinesListWrapper>
      {sortedTimelinesAlphabetically.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)

        return (
          <TimelinesWrapper key={timeline.id}>
            <IconAndNameWrapper
              onClick={onTimelineClick}
              checked={arraySelectedTimelinesId.includes(timeline.id)}
            >
              {timeline.timelineIconImageUrl ? (
                <IconWrapper>
                  <Img
                    src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                    alt="Icone"
                  />
                </IconWrapper>
              ) : (
                <IconWrapper color={timeline.color}>
                  {timeline.initials}
                </IconWrapper>
              )}
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
              <CategoryTags>
                {timeline.timeline_categories.map((category) => (
                  <CategoryTag key={category.id}>{category.name}</CategoryTag>
                ))}
              </CategoryTags>
            </IconAndNameWrapper>
            <EditButtonWrapper
              onClick={navigateToEditTimelinePage(history, timeline.id)}
            >
              <EditButton />
            </EditButtonWrapper>
          </TimelinesWrapper>
        )
      })}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
}

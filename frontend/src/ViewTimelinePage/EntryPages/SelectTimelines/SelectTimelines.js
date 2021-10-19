import React from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import {
  IconWrapper,
  Img,
  TimelineNameWrapper,
  TimelineWrapper,
  Wrapper,
} from './SelectTimelines.styles'

const uniqueByKey = (array, key) => {
  let seen = new Set()
  return array.filter((item) => {
    let k = item[key]
    return seen.has(k) ? false : seen.add(k)
  })
}
const filterTimelinesByCategories = (timelines, categoryId) => {
  return timelines.filter((timeline) =>
    timeline.timeline_categories
      .map((category) => category.id)
      .includes(categoryId)
  )
}
export const SelectTimelines = ({ timelines, entry, setEntry, bucketName }) => {
  const timelineCategories = timelines
    .map((timeline) => timeline.timeline_categories)
    .flat()
  const uniqueCategories = uniqueByKey(timelineCategories, 'id').sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  const selectedTimelineIds = entry.timelines.sync

  const sortedTimelines = timelines.sort((a, b) => a.name.localeCompare(b.name))

  const toggleTimelines = (_, timeline) => {
    const newEntry = { ...entry }
    if (newEntry.timelines.sync.includes(timeline.id)) {
      newEntry.timelines.sync = newEntry.timelines.sync.filter(
        (timeline_id) => timeline_id !== timeline.id
      )
    } else {
      newEntry.timelines.sync = [...newEntry.timelines.sync, timeline.id]
    }
    setEntry(newEntry)
  }

  return (
    <Wrapper>
      {uniqueCategories.map((category) => (
        <>
          <SectionTitle title={category.name} />
          {filterTimelinesByCategories(timelines, category.id).map(
            (timeline) => {
              const onTimelineClick = (event) =>
                toggleTimelines(event, timeline)
              return (
                <TimelineWrapper
                  key={`${category.id}${timeline.id}`}
                  onClick={onTimelineClick}
                  isSelected={selectedTimelineIds.includes(timeline.id)}
                >
                  {sortedTimelines.timelineIconImageUrl ? (
                    <IconWrapper borderColor={timeline.color}>
                      <Img
                        src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                      />
                    </IconWrapper>
                  ) : (
                    <IconWrapper color={timeline.color}>
                      {timeline.initials}
                    </IconWrapper>
                  )}
                  <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
                </TimelineWrapper>
              )
            }
          )}
        </>
      ))}
    </Wrapper>
  )
}

SelectTimelines.propTypes = {
  timelines: PropTypes.array,
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  bucketName: PropTypes.string,
}

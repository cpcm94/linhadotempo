import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../_shared/colors'
import PropTypes from 'prop-types'
import { Menu, MenuItem } from '@material-ui/core'
import { useContext } from 'react'
import { TimelinesContext } from '../TimelinesContextProvider'

const Button = styled.div`
  margin-right: 0.5rem;
  background-color: ${({ color }) => (color ? color : colors.white)};
  border: ${({ borderColor }) =>
    borderColor ? `solid 1px ${borderColor}` : `solid 1px ${colors.white}`};
  color: #655;
  border-radius: 5px;
  min-width: 1.8rem;
  min-height: 1.8rem;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  :hover {
    cursor: pointer;
  }
`
const StyledMenuItem = styled(MenuItem)`
  pointer-events: ${({ isInteractable }) => !isInteractable && 'none'};
  color: ${({ isInteractable }) =>
    !isInteractable && `${colors.lightGrey}`} !important;
`
const StyledMenu = styled(Menu)`
  & .MuiPopover-paper {
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32));
    margin-bottom: 0.75rem;
    outline: 0;
    position: absolute;
    overflow: visible;
  }

  & .MuiPopover-paper::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -12px;
    left: 8px;
    width: 12px !important;
    height: 12px !important;
    background-color: ${colors.white};
    transform: translateY(-50%) rotate(45deg);
    z-index: 10;
    outline: 0px;
  }
`

const Img = styled.img`
  border-radius: 5px;
  width: 1.75rem;
  height: 1.75rem;
  object-fit: cover;
  margin: 0;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 77vw;
  margin-right: 22%;
  overflow-x: scroll;
  @media (min-width: 1440px) {
    margin-right: 50%;
  }
  @media (max-width: 1439px) {
    margin-right: 25%;
  }

  min-height: 3rem;
  max-height: 3rem;
`
export const TimelinesButtonsRow = ({
  timelines,
  visibleTimelines,
  setVisibleTimelines,
  bucketName,
}) => {
  const { timelineIdsDisplayingOrigin, setTimelineIdsDisplayingOrigin } =
    useContext(TimelinesContext)
  const checkIfTimelineHasOriginEntry = (timelines, timelineId) => {
    if (timelineId) {
      const filteredTimelineById = timelines.filter(
        (timeline) => timeline.id === timelineId
      )[0]

      return !!filteredTimelineById.time_entry_id
    }
  }
  const [anchorElement, setAnchorElement] = useState(null)
  const arrayVisibleTimelinesId = visibleTimelines.map(
    (timeline) => timeline.id
  )
  const handleClick = (e) => {
    setAnchorElement(e.currentTarget)
  }
  const open = Boolean(anchorElement)
  const handleClose = () => {
    setAnchorElement(null)
  }
  const getTimelineById = (timelineId) =>
    timelines.filter((timeline) => timeline.id === timelineId)[0]

  const hasInvisibleTimelines = timelines.length > visibleTimelines.length

  const hasMoreThanOneTimeline = timelines.length > 1

  const handleSelect = (timelineId) => {
    if (arrayVisibleTimelinesId.includes(timelineId)) {
      setVisibleTimelines(
        visibleTimelines.filter(
          (timelineItem) => timelineItem.id !== timelineId
        )
      )
    } else {
      setVisibleTimelines([...visibleTimelines, getTimelineById(timelineId)])
    }
    handleClose()
  }

  const viewOnlySelectedTimeline = (timelineId) => {
    setVisibleTimelines([getTimelineById(timelineId)])
    handleClose()
  }

  const selectAllTimelines = () => {
    setVisibleTimelines(timelines)
    handleClose()
  }

  const toggleDistanceToOrigin = (timelineId) => {
    handleClose()
    if (timelineIdsDisplayingOrigin.includes(timelineId)) {
      setTimelineIdsDisplayingOrigin(
        timelineIdsDisplayingOrigin.filter((id) => timelineId !== id)
      )
    } else {
      setTimelineIdsDisplayingOrigin([
        ...timelineIdsDisplayingOrigin,
        timelineId,
      ])
    }
  }
  const anchorElementId = anchorElement && anchorElement.id
  return (
    <Wrapper>
      {timelines.map((timeline) => {
        return (
          <Fragment key={timeline.id}>
            {timeline.timelineIconImageUrl ? (
              <Button
                onClick={handleClick}
                isSelected={arrayVisibleTimelinesId.includes(timeline.id)}
                borderColor={timeline.color}
                id={timeline.id}
              >
                <Img
                  src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                  alt="Icone"
                />
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                isSelected={arrayVisibleTimelinesId.includes(timeline.id)}
                color={timeline.color}
                id={timeline.id}
              >
                {timeline.initials}
              </Button>
            )}
          </Fragment>
        )
      })}
      <StyledMenu
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleSelect(anchorElement.id)}>
          Mostrar/Esconder
        </MenuItem>
        {hasMoreThanOneTimeline && (
          <MenuItem onClick={() => viewOnlySelectedTimeline(anchorElement.id)}>
            Ver só essa
          </MenuItem>
        )}
        {hasInvisibleTimelines && (
          <MenuItem onClick={selectAllTimelines}>Ver todas</MenuItem>
        )}
        <StyledMenuItem
          onClick={() => toggleDistanceToOrigin(anchorElement.id)}
          isInteractable={checkIfTimelineHasOriginEntry(
            timelines,
            anchorElementId
          )}
        >
          {anchorElement &&
          timelineIdsDisplayingOrigin.includes(anchorElement.id)
            ? 'Esconder origem'
            : 'Mostrar origem'}
        </StyledMenuItem>
      </StyledMenu>
    </Wrapper>
  )
}

TimelinesButtonsRow.propTypes = {
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  setVisibleTimelines: PropTypes.func,
  bucketName: PropTypes.string,
}

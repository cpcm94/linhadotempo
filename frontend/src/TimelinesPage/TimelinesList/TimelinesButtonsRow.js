import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../_shared/colors'
import PropTypes from 'prop-types'
import { Menu, MenuItem } from '@material-ui/core'

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
  :hover {
    cursor: pointer;
  }
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
  margin-right: 5%;
  width: calc(100% - 5rem);
  overflow-x: scroll;

  min-height: 3rem;
  max-height: 3rem;
`
export const TimelinesButtonsRow = ({
  timelines,
  setSelectedTimelines,
  selectedTimelines,
  bucketName,
}) => {
  const [anchorElement, setAnchorElement] = useState(null)
  const arraySelectedTimelinesId = selectedTimelines.map(
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

  const handleSelect = (timelineId) => {
    if (arraySelectedTimelinesId.includes(timelineId)) {
      setSelectedTimelines(
        selectedTimelines.filter(
          (timelineItem) => timelineItem.id !== timelineId
        )
      )
    } else {
      setSelectedTimelines([...selectedTimelines, getTimelineById(timelineId)])
    }
    handleClose()
  }

  return (
    <Wrapper>
      {selectedTimelines.map((timeline) => {
        return (
          <Fragment key={timeline.id}>
            {timeline.timelineIconImageUrl ? (
              <Button
                onClick={handleClick}
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
        <MenuItem>
          {anchorElement && getTimelineById(anchorElement.id).name}
        </MenuItem>
        <MenuItem onClick={() => handleSelect(anchorElement.id)}>
          Desselecionar
        </MenuItem>
      </StyledMenu>
    </Wrapper>
  )
}

TimelinesButtonsRow.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
}

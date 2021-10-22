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
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  :hover {
    cursor: pointer;
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
      <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        // PaperProps={{
        //   elevation: 0,
        //   sx: {
        //     overflow: 'visible',
        //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //     mb: 1.5,
        //     '& .MuiPaper-root': {
        //       width: 32,
        //       height: 32,
        //       ml: -0.5,
        //       mr: 1,
        //     },
        //     '&:before': {
        //       content: '""',
        //       display: 'block',
        //       position: 'absolute',
        //       top: 0,
        //       right: 14,
        //       width: 10,
        //       height: 10,
        //       bgcolor: 'background.paper',
        //       transform: 'translateY(-50%) rotate(45deg)',
        //       zIndex: 0,
        //     },
        //   },
        // }}
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
      </Menu>
    </Wrapper>
  )
}

TimelinesButtonsRow.propTypes = {
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  setVisibleTimelines: PropTypes.func,
  bucketName: PropTypes.string,
}

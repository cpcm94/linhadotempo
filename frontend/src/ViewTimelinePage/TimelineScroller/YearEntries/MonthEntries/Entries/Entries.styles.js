import styled from 'styled-components'
import { colors } from '../../../../../_shared/colors'

export const DateWrapper = styled.div`
  display: flex;
  position: relative;
  /* visibility: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay ? 'hidden' : 'visible'}; */
  padding: 0.5rem 0;
  font-size: 0.9em;
  color: ${colors.grey};
`
export const LeftDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 0;
  right: 0%;
  bottom: 0;
  width: 2rem;
  z-index: 1;
`
export const RightDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 1;
  right: 0;
  bottom: 0;
  width: calc(100% - (2rem + 135px));
  z-index: 1;
`

export const EntryWrapper = styled.div`
  flex: 1;
  z-index: 2;
  position: relative;
`

export const EntryNameBackground = styled.div`
  flex: 1;
  position: relative;
  background-color: ${({ periodColor }) => periodColor && periodColor};
  padding: 0.5rem 0 0.5rem 1rem;
  border-radius: 0 5px 5px 0;
`

export const MonthWrapper = styled.div`
  min-width: 3.3rem;
  padding: 0 0.25rem;
`

export const DayWrapper = styled.div`
  min-width: 1.1rem;
`

export const DateText = styled.span`
  padding: 0 0.25rem 0 0;
  color: ${colors.grey};
`
export const DateSpan = styled.div`
  display: flex;
  z-index: 2;
  padding: 0 0.5rem;
  margin: 0 0 0 1.85rem;
`

import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

export const OuterDateWrapper = styled.div`
  display: flex;
  position: relative;
  /* visibility: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay ? 'hidden' : 'visible'}; */
  color: ${colors.grey};
  font-size: 0.9em;
  padding: 0.5rem 0;
  span {
    padding: 0 0.25rem;
  }
`
export const LeftDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 0;
  right: 0%;
  bottom: 0;
  width: 4.5rem;
  z-index: 1;
`
export const RightDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 1;
  right: 0;
  bottom: 0;
  width: ${({ yearLength }) =>
    `calc(100% - (4.5rem + 62px + ${yearLength * 8}px))`};
  z-index: 1;
`

export const EntryNameWrapper = styled.div`
  flex: 1;
  z-index: 2;
  position: relative;
`

export const EntryNameBackground = styled.div`
  flex: 1;
  background-color: ${({ periodColor }) => periodColor && periodColor};
  padding: ${({ hasMainImage }) =>
    hasMainImage ? '0.5rem 0' : '0.5rem 0 0.5rem 1rem'};
  border-radius: 0 5px 5px 0;
`

export const MonthDateWrapper = styled.div`
  min-width: 2rem;
`
export const DateWrapper = styled.div`
  display: flex;
  margin-left: 4.75rem;
  background: ${colors.white};
`
export const DateText = styled.div`
  background: ${colors.white};
  color: ${colors.grey};
`

import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'
import { getBoxShadowFromPeriods } from '../../../../_shared/getBoxShadowFromPeriods'

export const MonthWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  padding: 0.5rem;
  visibility: ${({ isDisplayEntryMonth }) =>
    isDisplayEntryMonth ? 'hidden' : 'visible'};
  &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0%;
    right: 0%;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }
  span {
    background: ${colors.white};
    padding: 0 0.25rem;
  }
  font-size: 0.9em;
  color: ${colors.grey};
`

export const MonthEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MonthAndEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: ${({ periods }) => {
    return periods.length === 1 && `${periods.length}px solid`
  }};
  margin-left: ${({ periods }) => {
    if (periods.length > 1) {
      return `${periods.length}px`
    }
  }};
  box-shadow: ${({ periods }) => getBoxShadowFromPeriods(periods)};
  -moz-box-shadow: ${({ periods }) => getBoxShadowFromPeriods(periods)};
  -webkit-shadow: ${({ periods }) => getBoxShadowFromPeriods(periods)};
  clip-path: ${({ periods }) => {
    if (periods.length > 1) {
      return `inset(0.3px 0.3px 0.3px -${periods.length}px)`
    }
  }};
  border-color: ${({ periods }) => {
    if (periods.length === 1) {
      return `${periods[0][0].period_color}`
    }
  }};
`

export const EntryNameWrapper = styled.div`
  flex: 1;
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

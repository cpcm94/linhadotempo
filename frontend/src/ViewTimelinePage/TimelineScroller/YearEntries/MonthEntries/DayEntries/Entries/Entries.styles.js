import styled from 'styled-components'
import { colors } from '../../../../../../_shared/colors'
import { getBoxShadowFromPeriods } from '../../../../../../_shared/getBoxShadowFromPeriods'

export const EntryDateWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  padding: 0.5rem;

  visibility: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay ? 'hidden' : 'visible'};
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
  font-size: 0.9em;
  color: ${colors.grey};
`

export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const EntryWrapper = styled.div`
  flex: 1;
`

export const MonthWrapper = styled.div`
  min-width: 3.3rem;
  padding: 0 0.25rem;
`

export const DayWrapper = styled.div`
  min-width: 1.1rem;
`

export const DateText = styled.span`
  background: ${colors.white};
  padding: 0 0.25rem 0 0;
  color: ${colors.grey};
`
export const DateSpan = styled.div`
  display: flex;
  padding: 0 0.5rem;
  background: ${colors.white};
  margin: 0 0 0 1.85rem;
`

import styled from 'styled-components'
import { colors } from '../../../../../../_shared/colors'

export const EntryDateWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  padding: 0.5rem 1rem 0.5rem 3rem;
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
  font-size: 0.85em;
  color: ${colors.brown};
`

export const YearSpan = styled.span`
  background: ${colors.white};
  padding: 0 0.5rem 0 0.25rem;
`

export const DaySpan = styled.span`
  background: ${colors.white};
  padding: 0 0.5rem 0 0.5rem;
`

export const MonthSpan = styled.span`
  background: ${colors.white};
  padding: 0 0.6rem 0 0.3rem;
`

export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const EntryWrapper = styled.div`
  flex: 1;
`

export const YearWrapper = styled.div`
  flex: 1.5;
`

export const MonthWrapper = styled.div`
  flex: 0.96;
`

export const DayWrapper = styled.div`
  flex: 0.68;
`

export const DateInnerWrapper = styled.div`
  background: ${colors.white};
  max-width: ${({ hasYear }) => (!hasYear ? 'auto' : '5rem')};
`

export const DayInnerWrapper = styled.div`
  background: ${colors.white};
  max-width: ${({ hasMonth }) => (!hasMonth ? 'auto' : '2.5rem')};
`
export const DateText = styled.span`
  background: ${colors.white};
  padding-right: 0.25rem;
  color: ${colors.grey};
`

import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

export const MonthWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: 0.85em;
  color: ${colors.grey};
`

export const MonthEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MonthAndEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const EntryWithoutDayWrapper = styled.div``

export const EntryNameWrapper = styled.div`
  flex: 1;
`
export const YearWrapper = styled.div``

export const MonthSpanWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const DateText = styled.span`
  background: ${colors.white};
  padding-right: 0.25rem;
  color: ${colors.grey};
`

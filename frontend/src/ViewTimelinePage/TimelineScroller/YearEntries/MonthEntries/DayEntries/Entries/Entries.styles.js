import styled from 'styled-components'
import { colors } from '../../../../../../_shared/colors'

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
`

export const EntryWrapper = styled.div`
  flex: 1;
`

export const YearWrapper = styled.div``

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

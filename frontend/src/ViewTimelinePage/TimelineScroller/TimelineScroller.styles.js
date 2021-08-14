import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const EntriesWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: 0;
  width: 100%;
  margin-bottom: 3rem;
  @media (min-width: 540px) {
    padding: 0 20%;
  }
  @media (min-width: 720px) {
    padding: 0 25%;
  }
  @media (min-width: 1080px) {
    padding: 0 35%;
  }
`
export const Wrapper = styled.div`
  width: 100%;
`
export const InvisibleIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const SpanWrapper = styled.div``

export const EntryWithoutYearLabelWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  z-index: 1;
  padding: 0.5rem 0;
  color: ${colors.lightGrey};
  visibility: ${({ isDisplayEntryYear }) =>
    isDisplayEntryYear ? 'hidden' : 'visible'};
  &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0;
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

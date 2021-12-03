import styled, { css, keyframes } from 'styled-components'
import { colors } from '../../_shared/colors'

export const EntriesWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: 0;
  width: min(100%, 600px);
  margin-bottom: 3rem;
`

export const InvisibleIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const EntryWithoutYearLabelWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  padding: 0.5rem;
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
    padding: 0 0.5rem;
    margin-left: 1.85rem;
  }
  font-size: 0.9em;
  color: ${colors.grey};
`
export const PeriodsEndsWrapper = styled.div`
  position: relative;
`
const newBackgroundColor = keyframes`
  from {
  background-color: ${colors.lightBrown};
  }
  to {
  background-color: ${colors.white};
  }
`
export const EntryAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1.25rem;
  animation: ${({ isNew }) =>
    isNew
      ? css`
          ${newBackgroundColor} 3s
        `
      : null};
  cursor: pointer;
  position: relative;
`

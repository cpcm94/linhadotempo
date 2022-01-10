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
  flex-direction: column;
  align-items: center;
`

export const EntryWithoutYearLabelWrapper = styled.div`
  display: flex;
  position: relative;
  color: ${colors.grey};
  font-size: 0.9em;
  padding: 0.5rem 0;
  span {
    padding: 0 0.25rem;
  }
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
export const LeftDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 0%;
  right: 0%;
  bottom: 0;
  width: calc(50% - 75px);
  z-index: 1;
`
export const RightDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 1;
  right: 0;
  bottom: 0;
  width: calc(50% - 75px);
  z-index: 1;
`
export const DateTextWrapper = styled.div`
  margin-left: calc(50% - 75px);
`
export const RightNoDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 1;
  right: 0;
  bottom: 0;
  width: calc(50% - 55px);
  z-index: 1;
`

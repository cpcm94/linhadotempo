import styled, { keyframes, css } from 'styled-components'
import { colors } from '../../../_shared/colors'

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
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  animation: ${({ isNew }) =>
    isNew
      ? css`
          ${newBackgroundColor} 3s
        `
      : null};
`

export const EntryYearWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row-reverse;
  z-index: 1;
  padding: 0.5rem 1rem 0.5rem 3rem;
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
  color: ${colors.brown};
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
`

export const EntryNameWrapper = styled.div`
  flex: 1;
  padding-right: 5px;
`

export const EntryIcon = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 5px;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem !important;
  max-height: 1.25rem;
  font-size: 0.5rem;
  text-align: center;
  font-weight: bold;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const EntriesWithoutMonthsWrapper = styled.div``

export const YearWrapper = styled.div`
  flex: 0.4;
`

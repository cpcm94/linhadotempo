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
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  animation: ${({ isNew }) =>
    isNew
      ? css`
          ${newBackgroundColor} 6s
        `
      : null};
`

export const EntryYearWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 0.5rem 0 0.5rem 3rem;
  color: ${colors.lightGrey};
  &:before {
    border-top: 1px solid ${colors.lightBrown};
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
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 2px;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem !important;
  max-height: 1rem;
  font-size: 1rem;
  text-align: center;
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

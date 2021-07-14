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
  padding: 0.5rem 0 0.5rem 0;
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
  &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 15%;
    right: 0%;
    bottom: 0;
    width: 85%;
    z-index: -1;
  }
  font-weight: bold;
  font-size: 0.85em;
  color: ${colors.grey};
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80px;
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
  min-width: 0.8rem;
  min-height: 0.8rem;
  max-width: 0.8rem !important;
  max-height: 0.8rem;
  font-size: 0.8rem;
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

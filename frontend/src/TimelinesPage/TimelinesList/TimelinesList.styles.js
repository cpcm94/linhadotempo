import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const TimelinesListWrapper = styled.div`
  height: 100%;
`

export const TimelineNameWrapper = styled.div`
  flex: 1;
`
export const EditButtonWrapper = styled.div`
  align-self: center;
  :hover {
    background-color: ${colors.lightBrown};
  }
`

export const IconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 1.25rem;
  :hover {
    background-color: ${colors.lightBrown};
  }
`
export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 5px;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem !important;
  max-height: 1.25rem;
  font-size: 0.75rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TimelinesWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

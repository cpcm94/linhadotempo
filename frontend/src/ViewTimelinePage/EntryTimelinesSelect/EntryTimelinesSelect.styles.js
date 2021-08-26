import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const ClosedDisplayWrapper = styled.div``
export const OpenDisplayWrapper = styled.div``

export const TimelineNameWrapper = styled.div`
  flex: 1;
`

export const IconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 0.5rem;
  height: ${({ timelinesIconRow }) => (timelinesIconRow ? '3.5rem' : '3rem')};
  transition: background-color 0.5s ease-out;

  background-color: ${({ isSelected }) =>
    isSelected ? colors.lightBrown : colors.white};
  :hover {
    filter: brightness(0.95);
  }
`

export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 2px;
  min-width: 1rem;
  min-height: 1rem;
  width: 1rem;
  height: 1rem;
  font-weight: bold;
  font-size: 0.5rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TimelineWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

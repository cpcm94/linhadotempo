import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

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
  padding: 1rem 0 1rem 1.5rem;
  :hover {
    background-color: ${colors.lightBrown};
  }
`

export const SelectedIconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 1.5rem;
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
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 2px;
  min-width: 0.8rem;
  min-height: 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.8rem;
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

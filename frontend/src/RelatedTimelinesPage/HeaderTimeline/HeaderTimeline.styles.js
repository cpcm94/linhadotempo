import styled from 'styled-components'
import { colors } from '../../_shared/colors'
export const TimelineNameWrapper = styled.div`
  flex: 1;
  width: 100%;
  @media (max-width: 425px) {
    display: none;
  }
`
export const MobileTimelineNameWrapper = styled.div`
  flex: 1;
  width: 100%;

  @media (min-width: 426px) {
    display: none;
  }
`
export const EditButtonWrapper = styled.div`
  align-self: center;
  cursor: pointer;
  background-color: ${colors.brown};
  :hover {
    background-color: ${colors.brown};
  }
`
export const IconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
  cursor: pointer;

  background-color: ${({ checked }) => (checked ? colors.brown : colors.white)};
  @media (min-width: 769px) {
    :hover {
      background-color: ${colors.lightBrown};
    }
  }
`
export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ color }) => (color ? color : colors.white)};
  border: ${({ color }) =>
    color ? `solid 1px ${color}` : `solid 1px ${colors.white}`};
  border-radius: 5px;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem !important;
  max-height: 1.25rem;
  font-size: 0.5rem;
  font-weight: bold;
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

export const Img = styled.img`
  border-radius: 5px;
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
  margin: 0;
`

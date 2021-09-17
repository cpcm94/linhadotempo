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
  cursor: pointer;
  :hover {
    background-color: ${colors.lightBrown};
  }
`

export const IconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 1.25rem;
  cursor: pointer;

  background-color: ${({ checked }) =>
    checked ? colors.lightBrown : colors.white};
  @media (min-width: 769px) {
    :hover {
      background-color: ${colors.lightBrown};
    }
  }
`
export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ color }) => (color ? color : colors.white)};
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

export const CheckMarkerWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ checked }) => (checked ? colors.brown : colors.white)};
  color: ${colors.white};
  border-radius: 5px;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem !important;
  max-height: 1rem;
  font-size: 0.75rem;
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

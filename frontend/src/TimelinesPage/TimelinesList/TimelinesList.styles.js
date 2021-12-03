import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const TimelinesListWrapper = styled.div`
  height: 100%;
`

export const TimelineNameWrapper = styled.div`
  height: 100%;
  padding: 1rem;
`
export const EditButtonWrapper = styled.div`
  align-self: center;
  cursor: pointer;
  padding: 0 1rem;
  :hover {
    background-color: ${colors.lightBrown};
  }
`

export const IconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  padding-left: 1.25rem;
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
export const CategoryTag = styled.div`
  border-radius: 5px;
  background-color: ${colors.brown};
  color: ${colors.white};
  padding: 0 0.25rem;
  margin-left: 0.25rem;
  display: block;
  white-space: nowrap; /* forces text to single line */
  overflow: hidden;
  text-overflow: ellipsis;
`

export const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`

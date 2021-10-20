import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const IconWrapper = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border: ${({ borderColor }) =>
    borderColor ? `solid 1px ${borderColor}` : `solid 1px ${colors.white}`};
  border-radius: 2px;
  min-width: 1.15rem;
  min-height: 1.15rem;
  width: 1.15rem;
  height: 1.15rem;
  font-weight: bold;
  font-size: 0.5rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Img = styled.img`
  border-radius: 5px;
  width: 0.9rem;
  height: 0.9rem;
  object-fit: cover;
  margin: 0;
`

export const TimelineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  padding-right: 0.5rem;
`
export const TimelineNameWrapper = styled.div`
  border-radius: 5px;
  padding: 0 0.25rem;
  transition: background-color 0.5s ease-out;
  max-width: calc(100vw - 3.75rem);
  display: block;
  white-space: nowrap; /* forces text to single line */
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TimelineIconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  border: ${({ borderColor }) => borderColor && `1px solid ${borderColor}`};
  background-color: ${({ isSelected }) =>
    isSelected ? colors.lightGrey : colors.white};
  :hover {
    filter: brightness(0.95);
  }
  border-radius: 5px;
`
export const Wrapper = styled.div`
  padding: 1.25rem;
`
export const TimelineCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

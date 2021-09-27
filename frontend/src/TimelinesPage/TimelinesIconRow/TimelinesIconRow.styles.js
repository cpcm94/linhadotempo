import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const StyledButton = styled.div`
  display: flex;
  height: 1.5rem;
  padding: 0.25rem;
  align-items: center;
  color: ${colors.white};
  background-color: ${colors.brown};
  border-radius: 5px;
  margin: 0 0.75rem 0.25rem 0;
  cursor: pointer;
  &:hover {
    background-color: ${colors.wine};
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const Img = styled.img`
  border-radius: 5px;
  width: 0.9rem;
  height: 0.9rem;
  object-fit: cover;
  margin: 0;
`
export const IconWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 0.25rem;
  background-color: ${({ color }) => (color ? color : colors.white)};
  border: ${({ timelineColor }) =>
    timelineColor ? `1px solid ${timelineColor}` : `1px solid ${colors.white}`};
  color: #655;
  border-radius: 3px;
  min-width: 1rem;
  min-height: 1rem;
  width: 1rem;
  height: 1rem;
  font-size: 0.5rem;
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const IconsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1;
  margin-left: 1rem;
`

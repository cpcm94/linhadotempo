import styled from 'styled-components'
import { colors } from '../_shared/colors'
export const Icon = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 5px;
  min-width: 1.5rem;
  min-height: 1.5rem;
  max-width: 1.5rem !important;
  max-height: 1.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`
export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  margin-right: 0.5rem;
  border: ${({ timelineColor }) =>
    timelineColor ? `solid 1px ${timelineColor}` : `solid 1px ${colors.white}`};
  color: #655;
  border-radius: 5px;
  min-width: 1.5rem;
  min-height: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
`
export const Img = styled.img`
  border-radius: 5px;
  width: 1.45rem;
  height: 1.45rem;
  object-fit: cover;
  margin: 0;
`

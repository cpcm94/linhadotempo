import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${colors.lightBrown};
  border-radius: 5px;
`

export const DayWrapper = styled.div`
  padding: 0.5rem 0.25rem;
  min-width: 10%;
  border-radius: 5px;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.lightBrown};
  color: ${({ selected }) => (selected ? colors.white : colors.black)};
  cursor: pointer;
`

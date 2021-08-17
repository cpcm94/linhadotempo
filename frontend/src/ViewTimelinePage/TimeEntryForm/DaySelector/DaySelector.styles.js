import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const DayWrapper = styled.div`
  padding: 0.5rem 0.25rem;
  min-width: 20%;
  border-radius: 5px;
  border: ${({ selected }) =>
    selected ? `solid 1px ${colors.brown}` : `solid 1px ${colors.white}`};
  cursor: pointer;
`

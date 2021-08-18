import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const DateWrapper = styled.div`
  display: flex;
  padding: 1rem 0 0 0;
  font-size: 1.25rem;
  margin-bottom: -2px;
`

export const DateSpan = styled.div`
  display: flex;
  padding: 0 0.5rem;
  border-style: ${({ selected }) =>
    selected ? `solid solid none solid` : 'none'};
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  background-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
`

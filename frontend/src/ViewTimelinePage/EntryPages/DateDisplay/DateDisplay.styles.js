import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const DateWrapper = styled.div`
  display: flex;
  font-size: 1.25rem;
  margin-bottom: -2px;
`

export const DateSpan = styled.div`
  display: flex;
  padding: 0 0.5rem;
  border-style: ${({ selected }) =>
    selected ? `solid solid none solid` : 'solid'};
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  background-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  color: ${({ isEmpty }) => (isEmpty ? colors.grey : colors.black)};
  cursor: pointer;
`

export const PeriodMessage = styled.div`
  padding: 0.5rem;
  color: ${colors.grey};
  font-size: 0.9rem;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

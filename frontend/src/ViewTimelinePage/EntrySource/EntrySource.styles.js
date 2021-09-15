import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const SourceTabs = styled.div`
  display: flex;
  font-size: 1.25rem;
`

export const TabSpan = styled.span`
  padding: 0 0.25rem;
  border-style: ${({ selected }) =>
    selected ? `solid solid none solid` : 'solid'};
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  background-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
`

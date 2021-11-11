import styled from 'styled-components'
import { colors } from '../../../../../_shared/colors'

export const MonthEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MonthAndEntryWrapper = styled.div`
  position: relative;
`

export const EntryDateWrapper = styled.div`
  display: flex;
  padding: 0.2rem 0.5rem 0 0;
  font-size: 0.8em;
  color: ${colors.grey};
  z-index: 2;
`

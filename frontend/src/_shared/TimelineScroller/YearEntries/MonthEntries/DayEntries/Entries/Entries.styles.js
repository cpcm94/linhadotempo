import styled from 'styled-components'
import { colors } from '../../../../../colors'

export const Wrapper = styled.div`
  display: flex;
`

export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const EntryDateWrapper = styled.div`
  margin: 0 5px 0 5px;
  padding: 0 5px 0 0px;
  border-right: solid ${colors.lightBrown} 1px;
  font-weight: bold;
  font-size: 0.85em;
`

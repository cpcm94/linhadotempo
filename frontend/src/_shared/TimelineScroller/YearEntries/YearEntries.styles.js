import styled from 'styled-components'
import { colors } from '../../colors'

export const Wrapper = styled.div`
  display: flex;
  min-height: 100px;
  color: ${colors.black};
`

export const EntryNameWrapper = styled.div`
  padding: 0 0px 0 5px;
`

export const EntryYearWrapper = styled.div``

export const EntryMonthDayWrapper = styled.div`
  margin: 0 10px 0 0px;
  border-right: solid ${colors.brown} 1px;
  padding: 0 10px 0 0;
  min-width: 40px;
`

export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const EntriesWithoutMonthsWrapper = styled.div`
  margin-left: 52px;
`

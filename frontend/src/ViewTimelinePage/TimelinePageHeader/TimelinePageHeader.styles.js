import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const EntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  color: ${colors.white};
`

export const HeaderWrapper = styled.div`
  display: flex;
  padding: 5px 20px;
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: sticky;
  top: 0;
  height: 2rem;
  z-index: 2;
  overflow-x: hidden;
`

export const YearWrapper = styled.div`
  flex: 1;
  text-align: center;
`

export const MonthWrapper = styled.div`
  flex: 1;
  text-align: center;
`

export const DayWrapper = styled.div`
  flex: 1;
  text-align: center;
`

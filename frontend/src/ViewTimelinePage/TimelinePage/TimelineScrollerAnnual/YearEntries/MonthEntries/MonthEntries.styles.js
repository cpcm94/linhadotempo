import styled from 'styled-components'
import { colors } from '../../../../../_shared/colors'

export const MonthEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const EntryDateWrapper = styled.div`
  padding: 0.2rem 0.5rem 0 0;
  font-size: 0.8em;
  color: ${colors.grey};
  z-index: 2;
  position: relative;
`
export const EntryDateBackground = styled.div`
  background-color: ${({ periodColor }) => periodColor && periodColor};
  padding: 0.5rem 0 0.5rem 1rem;
`
export const EntryNameBackground = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ periodColor }) => periodColor && periodColor};
  padding: 0.5rem 0 0.5rem 1rem;
  border-radius: 0 5px 5px 0;
`

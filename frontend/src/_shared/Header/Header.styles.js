import styled from 'styled-components'
import { colors } from '../colors'

export const Title = styled.div`
  font-size: 1.1rem;
  display: block;
  white-space: nowrap; /* forces text to single line */
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

export const PageActions = styled.div`
  display: flex;
  padding: 0 0.5rem;
`

export const IconRow = styled.div`
  padding: 0.25rem 0;
  width: 100%;
`

export const MiddleHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  flex: 1;
  align-items: center;
  width: 100%;
`

export const UpperHeader = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`
export const EntryTitle = styled.div`
  padding: 0 1.25rem;
  display: block;
  white-space: nowrap; /* forces text to single line */
  overflow: hidden;
  text-overflow: ellipsis;
`
export const LowerHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: ${colors.lightBrown};
  height: 100%;
  flex: 1;
  align-items: center;
`
export const TimelineTitle = styled.div`
  font-size: 1.1rem;
  width: 100%;
`

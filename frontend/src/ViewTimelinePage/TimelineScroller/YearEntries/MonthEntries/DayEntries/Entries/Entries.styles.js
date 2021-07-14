import styled from 'styled-components'
import { colors } from '../../../../../../_shared/colors'

export const EntryDateWrapper = styled.div`
  position: relative;
  z-index: 1;
  &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 15%;
    right: 0%;
    bottom: 0;
    width: 85%;
    z-index: -1;
  }
  font-weight: bold;
  font-size: 0.85em;
  color: ${colors.grey};
`

export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const EntryWrapper = styled.div`
  flex: 1;
`

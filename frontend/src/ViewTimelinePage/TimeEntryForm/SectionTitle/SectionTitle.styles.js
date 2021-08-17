import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const TitleWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  padding: 0.75rem 0 0.75rem 0.25rem;
  color: ${colors.lightGrey};
  visibility: ${({ isDisplayEntryYear }) =>
    isDisplayEntryYear ? 'hidden' : 'visible'};
  &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: -4%;
    right: 0%;
    bottom: 0;
    width: 108%;
    z-index: -1;
  }
  span {
    background: ${colors.white};
    padding: 0 0.25rem;
  }
  font-size: 0.85em;
  color: ${colors.brown};
`
export const XIconWrapper = styled.div`
  background-color: ${colors.white};
  position: absolute;
  right: 0;
  top: 15%;
`

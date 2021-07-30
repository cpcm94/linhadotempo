import styled from 'styled-components'
import { colors } from '../_shared/colors'

export const EllipsisButtonsWrapper = styled.div`
  position: fixed;
  right: 2.5rem;
  background-color: ${colors.brown};
  @media (min-width: 1440px) {
    right: 37.5%;
  }
  @media (max-width: 1439px) {
    right: 29%;
  }
  @media (max-width: 1023px) {
    right: 29.5%;
  }
  @media (max-width: 719px) {
    right: 2.5rem;
    bottom: 0.25rem;
  }
`

export const AddButtonWrapper = styled.div`
  position: fixed;
  bottom: 1.25rem;
  background-color: ${colors.brown};
  @media (min-width: 1440px) {
    right: 35.5%;
  }
  @media (max-width: 1439px) {
    right: 26%;
  }
  @media (max-width: 1023px) {
    right: 26.5%;
  }
  @media (max-width: 719px) {
    right: 0.75rem;
    bottom: 0.5rem;
  }
`

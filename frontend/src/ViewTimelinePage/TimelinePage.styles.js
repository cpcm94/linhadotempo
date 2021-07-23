import styled from 'styled-components'
import { colors } from '../_shared/colors'

export const EllipsisButtonsWrapper = styled.div`
  position: fixed;
  right: 2.5rem;
  bottom: 1rem;
  background-color: ${colors.brown};
  @media (min-width: 1600px) {
    right: 32%;
  }
  @media (max-width: 1599px) {
    right: 25%;
  }
  @media (max-width: 1439px) {
    right: 15%;
  }
  @media (max-width: 1023px) {
    right: 28%;
  }
  @media (max-width: 719px) {
    right: 2.5rem;
    bottom: 1rem;
  }
`

export const AddButtonWrapper = styled.div`
  position: fixed;
  right: 0.75rem;
  bottom: 1.25rem;
  background-color: ${colors.brown};
  @media (min-width: 1600px) {
    right: 30%;
  }
  @media (max-width: 1599px) {
    right: 22%;
  }
  @media (max-width: 1439px) {
    right: 12%;
  }
  @media (max-width: 1023px) {
    right: 25%;
  }
  @media (max-width: 719px) {
    right: 0.75rem;
    bottom: 1.25rem;
  }
`

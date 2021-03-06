import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const AddButtonWrapper = styled.div`
  position: fixed;
  background-color: ${colors.brown};
  padding-left: 0.5rem;
  @media (min-width: 1440px) {
    right: 35.5%;
    bottom: 0.65rem;
  }
  @media (max-width: 1439px) {
    right: 26%;
    bottom: 0.65rem;
  }
  @media (max-width: 1023px) {
    right: 26.5%;
    bottom: 0.65rem;
  }
  @media (max-width: 719px) {
    right: 0.75rem;
    bottom: 0.65rem;
  }
`

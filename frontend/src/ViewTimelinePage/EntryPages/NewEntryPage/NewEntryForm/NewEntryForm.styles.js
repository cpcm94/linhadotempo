import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 6rem);
  padding: 0.75rem;
  margin-bottom: 5.5rem;
`
export const Wrapper = styled.div`
  display: flex;
`

export const SubmitButtonWrapper = styled.div`
  padding: 0 0.5rem 0.5rem 0;
  position: fixed;
  bottom: 0;
  background-color: ${colors.white};
  width: calc(100% - 1rem);
  z-index: 2;
`

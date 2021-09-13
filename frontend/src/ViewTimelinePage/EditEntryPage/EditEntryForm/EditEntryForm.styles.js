import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 2rem);
  padding: 0.75rem;
  margin-bottom: 5rem;
`
export const Wrapper = styled.div`
  display: flex;
`
export const EditButtonsWrapper = styled.div`
  display: flex;
  width: calc(100vw - 1.5rem);
  position: fixed;
  bottom: 5%;
  background-color: ${colors.white};
  padding: 0 0.75rem;
`

import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 7.5rem);
  padding: 0.75rem;
  margin-bottom: 5rem;
`
export const Wrapper = styled.div`
  display: flex;
`
export const EditButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${colors.white};
  padding: 0 0.75rem 0.5rem 0.75rem;
  height: 5rem;
  align-items: flex-end;
  z-index: 2;
`

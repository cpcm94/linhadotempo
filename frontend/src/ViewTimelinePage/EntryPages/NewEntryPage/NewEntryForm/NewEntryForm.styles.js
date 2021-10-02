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

export const DeleteButtonWrapper = styled.div`
  width: 100%;
  border-top: ${({ showBorder }) =>
    showBorder && `1px solid ${colors.lightGrey}`};
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
`

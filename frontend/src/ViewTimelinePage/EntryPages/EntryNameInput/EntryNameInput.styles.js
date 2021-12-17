import styled from 'styled-components'
import { TextareaAutosize } from '@material-ui/core'
import { colors } from '../../../_shared/colors'

export const Input = styled(TextareaAutosize)`
  display: flex;
  flex-wrap: wrap;
  border: 0;
  width: calc(100vw - 2rem);
  padding: 0;
  margin: 1rem 1.5rem 1rem 0.5rem;
  background-color: ${colors.white};
  &:focus {
    outline: none;
  }
`
export const InputAndMicWrapper = styled.div`
  display: flex;
`

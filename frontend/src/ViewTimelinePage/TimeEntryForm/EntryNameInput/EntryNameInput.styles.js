import styled from 'styled-components'
import { TextareaAutosize } from '@material-ui/core'

export const Input = styled(TextareaAutosize)`
  display: flex;
  flex-wrap: wrap;
  border: 0;
  width: calc(100vw - 2rem);
  padding: 0;
  margin: 1rem 0 1rem 0.5rem;
  &:focus {
    outline: none;
  }
`

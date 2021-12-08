import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const SeachBar = styled.input`
  margin-left: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${colors.brown};
  :focus {
    outline: 0;
  }
`

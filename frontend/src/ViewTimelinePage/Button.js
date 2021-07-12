import styled from 'styled-components'
import { colors } from '../_shared/colors'

export const Button = styled.div`
  background-color: ${colors.white};
  margin: 0 0.5rem 0 0.5rem;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`

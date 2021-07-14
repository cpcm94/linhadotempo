import styled from 'styled-components'
import { colors } from '../_shared/colors'

export const Button = styled.div`
  background-color: ${colors.white};
  margin: 0 0.5rem 0 0.5rem;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 1.8rem;
  min-height: 1.8rem;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  :hover {
    cursor: pointer;
  }
`

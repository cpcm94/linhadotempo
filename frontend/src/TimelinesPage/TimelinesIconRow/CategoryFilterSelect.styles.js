import { Box } from '@material-ui/core'
import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const StyledBox = styled(Box)`
  position: absolute;
  top: 6.5rem;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid #000;
  display: flex;
  flex-wrap: wrap;
`

export const CategoryName = styled.div`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : colors.lightBrown)};
  border: 1px solid ${({ bgColor }) => (bgColor ? bgColor : colors.lightGrey)};
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
`
export const Button = styled.div`
  background-color: ${colors.white};
  color: ${colors.brown};
  border-radius: 0 5px 5px 0;
  border: 1px solid ${colors.brown};
  border-left: none;
  padding: 1px 0.5rem 1px 0.5rem;
`

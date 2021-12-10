import { Box } from '@material-ui/core'
import styled from 'styled-components'
import { colors } from '../colors'

export const StyledBox = styled(Box)`
  position: absolute;
  top: 8.25rem;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid #000;
`

export const CategoryName = styled.div`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : colors.lightBrown)};
  border: 1px solid ${({ bgColor }) => (bgColor ? bgColor : colors.lightGrey)};
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
`
export const Button = styled.div`
  background-color: ${colors.brown};
  color: ${colors.white};
  border-radius: 0 5px 5px 0;
  border: 1px solid ${colors.brown};
  border-left: none;
  padding: 2px 0.25rem 2px 0.25rem;
`

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const ResetButton = styled.div`
  align-self: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  color: ${colors.white};
  background-color: ${colors.brown};
`
export const ResetButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

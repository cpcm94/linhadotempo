import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { colors } from '../../../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  border: ${({ disableButton }) =>
    disableButton ? `solid 2px ${colors.red}` : `solid 1px ${colors.brown}`};
  margin: 1rem 0;
  padding: 0.5rem;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`
export const InnerWrapper = styled.div`
  flex: 1;
`

export const StyledButton = styled(Button)`
  height: 3rem;
  align-self: center;
  cursor: ${({ entryCreated }) =>
    entryCreated ? 'default' : 'pointer'} !important;

  &.MuiButton-root {
    background-color: ${colors.brown};
  }
  && {
    color: ${colors.white};
  }

  &&:hover {
    background-color: ${colors.wine};
  }
`

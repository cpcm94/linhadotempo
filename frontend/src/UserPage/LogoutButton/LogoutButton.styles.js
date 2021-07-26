import styled from 'styled-components'
import { colors } from '../../_shared/colors'
import { Button } from '@material-ui/core'

export const StyledButton = styled(Button)`
  height: 3.5rem;
  width: 14rem;
  align-self: center;
  && {
    color: ${colors.white};
  }
  &.MuiButton-contained {
    background-color: ${colors.brown};
  }
`

import { colors } from '../../_shared/colors'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
export const StyledButton = styled(Button)`
  height: 3.5rem;
  width: 100%;
  && {
    color: ${colors.white};
  }
  &.MuiButton-contained {
    background-color: ${colors.brown};
  }
`

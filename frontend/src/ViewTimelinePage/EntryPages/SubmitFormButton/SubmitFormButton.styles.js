import { colors } from '../../../_shared/colors'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
export const StyledButton = styled(Button)`
  height: 3rem;
  width: 100%;
  && {
    color: ${colors.white};
  }
  &.MuiButton-contained {
    background-color: ${colors.brown};
  }
  &&:hover {
    background-color: ${colors.wine};
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

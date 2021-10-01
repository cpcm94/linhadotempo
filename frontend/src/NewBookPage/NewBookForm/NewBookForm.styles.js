import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'
import { Button } from '@material-ui/core'

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
  width: calc(100% - 2.5rem);
  margin: 0 0 0 1.25rem;
  align-items: center;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`

export const StyledTextField = styled(TextField)`
  margin-top: 1rem !important;
  width: 100%;
  label.Mui-focused {
    color: ${colors.brown};
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${colors.brown};
    }
    &.Mui-focused fieldset {
      border-color: ${colors.brown};
    }
  }
`

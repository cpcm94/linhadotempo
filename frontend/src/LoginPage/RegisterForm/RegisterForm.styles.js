import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'
import { Button } from '@material-ui/core'

export const StyledTextField = styled(TextField)`
  margin: 0.75rem 0 !important;

  label.Mui-focused {
    color: ${colors.brown};
  }

  .MuiSelect-root {
    min-width: 30px;
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
  &&:hover {
    background-color: ${colors.wine};
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2.5rem);
`
export const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`

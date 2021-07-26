import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../_shared/colors'
import { Button } from '@material-ui/core'

export const StyledTextField = styled(TextField)`
  align-self: center;
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
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`

export const ForgotPasswordText = styled.div`
  margin-top: 15px;
  min-width: 160px;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../colors'
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
export const ColorInitialsDisplay = styled.div`
  display: flex;
  border-radius: 0 5px 5px 5px;
`

export const InitialsAndColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1rem;
`

export const TextFieldColor = styled(TextField)`
  label.Mui-focused {
    color: ${colors.brown};
  }
  background-color: ${colors.white};

  &.MuiFormControl-root {
    margin: 1rem 0 1rem 0;
    width: 5rem;
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

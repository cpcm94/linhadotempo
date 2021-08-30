import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../../_shared/colors'
import { Button } from '@material-ui/core'

export const YearFieldAndButtons = styled.div`
  display: flex;
  align-items: center;
`

export const StyledButton = styled(Button)`
  height: 2.5rem;
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

export const StyledYearTextField = styled(TextField)`
  #entryYear {
    background-color: ${colors.white};
    border-radius: 5px;
  }
  label.Mui-focused {
    color: ${colors.brown};
  }
  label {
    background-color: ${colors.white};
    border-radius: 5px;
  }
  .MuiInputBase-root {
    max-width: 5rem;
  }

  &.MuiFormControl-root {
    margin: 1rem 0 1rem 0;
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
export const YearAndRadiosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.lightBrown};
  border-radius: 5px;
  padding-bottom: 1rem;
`

import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../../_shared/colors'

export const YearFieldAndButtons = styled.div`
  display: flex;
  align-items: center;
`

export const StyledYearTextField = styled(TextField)`
  label.Mui-focused {
    color: ${colors.brown};
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
`

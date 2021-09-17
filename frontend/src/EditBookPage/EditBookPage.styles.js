import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../_shared/colors'
// import { Button } from '@material-ui/core'

export const Wrapper = styled.div``

export const StyledTextField = styled(TextField)`
  label {
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

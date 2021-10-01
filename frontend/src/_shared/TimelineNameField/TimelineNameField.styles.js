import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'
export const TextFieldColor = styled(TextField)`
  label.Mui-focused {
    color: ${colors.brown};
  }
  #timelineColor {
    height: 20px;
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

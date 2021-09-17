import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledTextField = styled(TextField)`
  margin-top: 1rem !important;
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

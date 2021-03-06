import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'

export const StyledTextField = styled(TextField)`
  margin: 0.75rem 0 !important;

  label {
    color: ${colors.brown};
  }
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
export const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  padding: 0 1.25rem;
  flex-direction: column;
`

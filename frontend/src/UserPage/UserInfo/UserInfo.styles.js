import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'
export const StyledTextField = styled(TextField)`
  margin: 0.75rem 0 !important;
  label {
    color: ${colors.brown} !important;
  }
  .MuiSelect-root {
    min-width: 30px;
  }
  #userName {
    color: ${colors.black};
  }
  #userType {
    color: ${colors.black};
  }
  #userEmail {
    color: ${colors.black};
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${colors.brown} !important;
    }
    &.Mui-focused fieldset {
      border-color: ${colors.brown} !important;
    }
  }
`

export const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  padding: 0 1.25rem;
  flex-direction: column;
  flex: 1;
`

import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../../_shared/colors'

export const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: ${colors.brown};
  }
  .MuiSelect-root {
    min-width: 30px;
  }
  #timeline_id {
    max-width: 177px;
  }
  .MuiInputBase-root {
    max-width: calc(100vw - 3rem);
  }

  &.MuiFormControl-root {
    margin: 1rem 1.5rem 1rem 0.5rem;
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
export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 2rem);
  padding: 0.75rem;
`
export const Wrapper = styled.div`
  display: flex;
`

import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 3rem);
  padding: 1rem 0 1rem 0;
`
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2.5rem);
  border-bottom: 1px solid ${colors.lightGrey};
  padding-bottom: 1rem;
`
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

export const ErrorMessage = styled.div`
  color: ${colors.red};
`

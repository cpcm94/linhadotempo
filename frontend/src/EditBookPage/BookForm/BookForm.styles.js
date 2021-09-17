import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2.5rem);
  margin: 0 0 0 1.25rem;
  align-items: center;
`

export const StyledTextField = styled(TextField)`
  margin-top: 1rem !important;
  margin-bottom: ${({ date }) => date && '1rem'} !important;
  width: 100%;
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

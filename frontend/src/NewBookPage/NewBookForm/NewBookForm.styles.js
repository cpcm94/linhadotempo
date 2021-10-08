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

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`

export const StyledTextField = styled(TextField)`
  margin-top: 1rem !important;
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
export const DeleteButtonWrapper = styled.div`
  width: 100%;
  border-top: ${({ showBorder }) =>
    showBorder && `1px solid ${colors.lightGrey}`};
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
`

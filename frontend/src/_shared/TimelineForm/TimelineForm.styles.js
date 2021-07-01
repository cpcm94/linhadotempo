import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../colors'
import { Button } from '@material-ui/core'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 2rem);
  padding: 1rem;
`

export const NewTimelineNameWrapper = styled.input`
  width: 50vw;
  max-height: 20px;
`

export const BottomContainer = styled.div`
  height: calc(80vh - 2rem);
`

export const TimelineTitle = styled.div`
  text-align: center;
`

export const TimelineNameLabel = styled.label`
  padding-right: 5px;
`

export const TextFieldColor = styled(TextField)`
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

export const StyledButton = styled(Button)`
  height: 56px;
  && {
    color: ${colors.white};
  }
  background-color: ${colors.brown} !important;
`

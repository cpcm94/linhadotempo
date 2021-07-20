import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../../../_shared/colors'
import { Button } from '@material-ui/core'
import RadioGroup from '@material-ui/core/RadioGroup'

export const StyledTextField = styled(TextField)`
  align-self: center;
  label.Mui-focused {
    color: ${colors.brown};
  }
  .MuiSelect-root {
    min-width: 30px;
  }
  #timeline_id {
    min-width: 177px;
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
export const MonthDayWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

export const StyledButton = styled(Button)`
  height: 3.5rem;
  width: 14rem;
  align-self: center;
  && {
    color: ${colors.white};
  }
  &.MuiButton-contained {
    background-color: ${colors.brown};
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: calc(100vh - 2rem);
  padding: 0.75rem;
  align-items: center;
`

export const StyledRadioGroup = styled(RadioGroup)`
  margin-top: -2rem;
  display: flex;
  justify-content: space-evenly;
`

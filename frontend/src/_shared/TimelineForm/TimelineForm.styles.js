import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../colors'
import { Button } from '@material-ui/core'

export const Icon = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  max-width: 2rem !important;
  max-height: 2rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`

export const ImportExportButtons = styled.div`
  display: flex;
  margin: 1rem 0;
`

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
`

export const ExportText = styled.pre`
  margin: 0;
  padding: 2rem 0 0 0;
  width: calc(100% - 2.5rem);
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

export const StyledButton = styled(Button)`
  height: 56px;
  margin: 0 1rem !important;
  && {
    color: ${colors.white};
  }
  background-color: ${colors.brown} !important;
`

import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../colors'

export const ColorInitialsDisplay = styled.div`
  display: flex;
  background-color: ${colors.lightBrown};
  border-radius: 0 5px 5px 5px;
  padding: 0 0 0 1rem;
`

export const InitialsAndColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1rem;
`

export const IconTabs = styled.div`
  display: flex;
  font-size: 1.25rem;
`

export const TabSpan = styled.span`
  padding: 0 0.25rem;
  border-style: ${({ selected }) =>
    selected ? `solid solid none solid` : 'solid'};
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  background-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
`

export const TextFieldColor = styled(TextField)`
  label.Mui-focused {
    color: ${colors.brown};
  }
  background-color: ${colors.white};

  &.MuiFormControl-root {
    margin: 1rem 0 1rem 0;
    width: 5rem;
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

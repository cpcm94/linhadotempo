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
  margin: 1rem 0;
`

export const ImportExportButtons = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  width: calc(100% - 2.5rem);
  border-bottom: solid 1px ${colors.lightGrey};
  padding: 0 0 1rem 0;
`

export const ConfirmButton = styled.div`
  display: flex;
  height: 2rem;
  padding: 0.75rem;
  align-items: center;
  color: ${colors.white};
  background-color: ${colors.brown};
  border-radius: 5px;
  margin: 0 1.25rem 0.25rem 0;
  cursor: pointer;
  &:hover {
    background-color: ${colors.wine};
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`

export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
`
export const Img = styled.img`
  border-radius: 5px;
  width: 1.9rem;
  height: 1.9rem;
  object-fit: cover;
  margin: 0;
`

export const ConfirmationWrapper = styled.div`
  border-radius: 5px;
  border: 1px solid ${colors.brown};
  margin: 0 1.25rem;
  padding: 0.5rem;
`

export const ConfirmButtonsWrapper = styled.div`
  margin: 0.5rem 0 0 0;
  display: flex;
  justify-content: space-evenly;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 3rem);
  padding: 1rem 0 1rem 0;
`

export const ImageAndButtonWrapper = styled.div`
  display: flex;
  background-color: ${colors.lightBrown};
  border-radius: 5px;
  height: 4rem;
  align-items: center;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2.5rem);
  border-bottom: 1px solid ${colors.lightGrey};
  padding-bottom: 1rem;
`

export const ExportText = styled.pre`
  margin: 0;
  padding: 1rem;
  width: calc(100% - 2.5rem);
  border: solid 1px ${colors.brown};
  border-radius: 5px;
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

  && {
    color: ${colors.white};
  }
  &.MuiButton-contained {
    background-color: ${colors.brown};
  }
  &&:hover {
    background-color: ${colors.wine};
  }
`

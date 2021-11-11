import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../colors'
import { Button } from '@material-ui/core'

export const StyledButton = styled(Button)`
  height: 3rem;
  width: 12.5rem;
  margin-top: ${({ marginTop }) => marginTop && '1rem'} !important;
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
export const ColorInitialsDisplay = styled.div`
  display: flex;
  border-radius: 0 5px 5px 5px;
`

export const InitialsAndColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1rem;
`

export const Icon = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border: ${({ color }) =>
    color ? `solid 1px ${color}` : `solid 1px ${colors.white}`};
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
export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  border: ${({ timelineColor }) =>
    timelineColor ? `solid 1px ${timelineColor}` : `solid 1px ${colors.white}`};
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
`
export const Img = styled.img`
  border-radius: 5px;
  width: 1.9rem;
  height: 1.9rem;
  object-fit: cover;
  margin: 0;
`
export const UploaderAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const ImageAndButtonWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  height: 4rem;
  align-items: center;
`

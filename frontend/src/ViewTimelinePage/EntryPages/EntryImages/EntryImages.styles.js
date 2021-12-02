import { colors } from '../../../_shared/colors'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'

export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  border: solid 1px ${colors.grey};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  color: #655;
  border-radius: 5px;
  max-width: 100%;
  max-height: 100%;
  min-width: 2.5rem;
  min-height: 2.5rem;
`
export const Img = styled.img`
  border-radius: 5px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  margin: 0;
  font-size: 0.9rem;
`

export const Wrapper = styled.div`
  display: flex;
  margin: 0 0.5rem;
  align-items: center;
  flex-direction: column;
  .fileUploaderWrapper {
    margin-left: -0.5rem;
  }
`
export const ImageAndOptionsWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const StyledTextField = styled(TextField)`
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  max-width: 425px;
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

export const ButtonsWrapper = styled.div`
  display: flex;
  height: inherit;
  @media (max-width: 425px) {
    flex-direction: column-reverse;
    align-items: center;
    min-height: 10rem;
    justify-content: space-evenly;
  }
  @media (min-width: 426px) {
    align-items: center;
  }
`

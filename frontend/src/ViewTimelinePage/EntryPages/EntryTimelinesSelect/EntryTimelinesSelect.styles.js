import styled from 'styled-components'
import { colors } from '../../../_shared/colors'
import { Button } from '@material-ui/core'

export const StyledButton = styled(Button)`
  height: 2.5rem;
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
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`
export const ClosedDisplayWrapper = styled.div``
export const OpenDisplayWrapper = styled.div``

export const TimelineNameWrapper = styled.div`
  flex: 1;
`

export const Img = styled.img`
  border-radius: 5px;
  width: 0.9rem;
  height: 0.9rem;
  object-fit: cover;
  margin: 0;
`

export const ClosedIconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 0.5rem;
  transition: background-color 0.5s ease-out;

  background-color: ${({ isSelected }) =>
    isSelected ? colors.lightBrown : colors.white};
  :hover {
    filter: brightness(0.95);
  }
`

export const OpenIconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 0.5rem;
  margin: 0.25rem 0 0 0;
  transition: background-color 0.5s ease-out;
  border-radius: 5px;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.brown : colors.lightBrown};
  :hover {
    filter: brightness(0.95);
  }
`

export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border: ${({ borderColor }) =>
    borderColor
      ? `solid 1px ${borderColor}`
      : `solid 1px ${colors.borderColor}`};
  border-radius: 2px;
  min-width: 1rem;
  min-height: 1rem;
  width: 1rem;
  height: 1rem;
  font-weight: bold;
  font-size: 0.5rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TimelineWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

import styled from 'styled-components'
import { colors } from '../../../_shared/colors'
import { Button } from '@material-ui/core'

export const StyledButton = styled(Button)`
  height: 2.5rem;
  width: 2rem;
  margin-top: 0.5rem !important;
  align-self: center;
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
export const ClosedDisplayWrapper = styled.div``

export const OpenDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

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

export const IconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 0.5rem;
  transition: background-color 0.5s ease-out;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.lightBrown : colors.white};
  border-radius: 5px;
`

export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border: ${({ borderColor }) =>
    borderColor ? `solid 1px ${borderColor}` : `solid 1px ${colors.white}`};
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
export const OpenTimelineWrapper = styled.div`
  display: flex;
  cursor: pointer;
  border: 1px solid ${colors.lightBrown};
  border-radius: 5px;
  margin-top: 0.25rem;
  align-items: center;
`

export const CheckBoxWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 1.25rem;
  border-radius: 5px;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem;
  max-height: 1rem;
  font-size: 0.75rem;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.white};
  border: ${({ selected }) =>
    selected ? `1px solid ${colors.brown}` : `1px solid ${colors.lightGrey}`};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const SpanMessage = styled.span`
  padding: 0 0.75rem;
`
